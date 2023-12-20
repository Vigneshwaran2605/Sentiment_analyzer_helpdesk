from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from rest_framework.decorators import api_view
from .serializers import *
from .models import *
from rest_framework.response import Response
from rest_framework import status
import os
import subprocess
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.decorators import parser_classes
from rest_framework.views import APIView
import mimetypes
from pydub import AudioSegment
from io import BytesIO
from django.core.files.base import ContentFile

from django.db.models import Sum, Count, Avg
from rest_framework import viewsets
from .models import CallAnalysis

class CallAnalysisReadOnlyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CallAnalysis.objects.all()
    serializer_class = CallAnalysisSerializer

@api_view(['GET'])
def send_audio_file(request, pk):
    call_history = get_object_or_404(CallHistory, pk=pk)

    if call_history.callRecord:
        try:
            with open(call_history.callRecord.path, 'rb') as audio_file:
                mime_type, _ = mimetypes.guess_type(call_history.callRecord.path)
                if mime_type:
                    response = HttpResponse(audio_file, content_type=mime_type)
                    response['Content-Disposition'] = f'attachment; filename="{call_history.callRecord.name}"'
                    return response
                else:
                    return Response({'error': 'Unable to determine file type'}, status=status.HTTP_400_BAD_REQUEST)
        except FileNotFoundError:
            return Response({'error': 'Audio file not found'}, status=status.HTTP_404_NOT_FOUND)
    else:
        return Response({'error': 'No audio file associated with this call record'}, status=status.HTTP_404_NOT_FOUND)


class CreateCallHistoryAPIView(APIView):
    def post(self, request, format=None):
        audio_file = request.FILES.get('audio_file')
        if audio_file:
        # Check if the uploaded file is in OGG format
            if audio_file.name.endswith('.ogg'):
                # Convert OGG audio to WAV
                try:
                    ogg_audio = AudioSegment.from_file(audio_file)
                    wav_buffer = BytesIO()
                    ogg_audio.export(wav_buffer, format='wav')
                    wav_buffer.seek(0)

                    # Save the WAV data as a new file
                    wav_file = ContentFile(wav_buffer.read())
                    wav_file.name = audio_file.name[:-4] + '.wav'  # Change the extension to .wav

                    # Assign the converted WAV file to callRecord
                    audio_file = wav_file
                except Exception as e:
                    return Response({'error': f'Failed to convert OGG to WAV: {e}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        if audio_file:
            user_id = request.user.id
            client_data = request.data.get('client')
            if client_data:
                try:
                    client_id = int(client_data)
                    client = CustomUser.objects.get(pk=client_id)
                except (ValueError, CustomUser.DoesNotExist):
                    return Response({'error': 'Invalid client data'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'error': 'Client data not provided'}, status=status.HTTP_400_BAD_REQUEST)
            
            employee = CustomUser.objects.get(pk=int(request.data.get('employee')))


            callhistory = CallHistory(
                callRecord=audio_file,
                employee = employee,
                client = client,
                duration = 100,
            )
    
            

            callhistory.save()
            return Response(CallHistorySerializer(callhistory).data)
        else:
            return Response({'error': 'Audio file not provided'}, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
def delete_call_history(request, pk):
    try:
        call_history = CallHistory.objects.get(pk=pk)
    except CallHistory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    call_history.callRecord.delete()
    call_history.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def get_call_history(request, pk):
    try:
        call_history = CallHistory.objects.get(pk=pk)
        print("urls",call_history.callRecord.url)
        serializer = CallHistorySerializer(call_history)
        return Response(serializer.data)
    except CallHistory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def list_call_history(request):
    print("user:",request.user.id)
    call_histories = CallHistory.objects.filter(employee=request.user.id)
    serializer = CallHistorySerializer(call_histories, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
def update_call_history(request, pk):
    try:
        call_history = CallHistory.objects.get(pk=pk)
    except CallHistory.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CallHistorySerializer(call_history, data=request.data)
    if serializer.is_valid():
        client = serializer.validated_data.get('client')
        employee = request.user

        if client and employee:
            if client.post != 'C' or employee.post != 'E':
                return Response({'error': 'Invalid client or employee type'}, status=status.HTTP_400_BAD_REQUEST)

        audio_file = request.FILES.get('audio_file')
        if audio_file:
            file_path = os.path.join('calls', audio_file.name)
            with open(file_path, 'wb+') as destination:
                for chunk in audio_file.chunks():
                    destination.write(chunk)
            
            duration_command = f"ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {file_path}"
            duration = subprocess.check_output(duration_command, shell=True)
            duration = int(float(duration))
            call_history.callRecord = file_path
            call_history.duration = duration
        
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
def details(req):
    if(req.user.post=='M'):
        noofcalls = CustomUser.objects.filter(post='E').count()
        duration = CallHistory.objects.all().aggregate(duration=Sum('duration'))['duration']/60
        return Response({
            "members":noofcalls,
            "duration":duration
        })
    else:
        noofcalls = CallHistory.objects.filter(employee=req.user.id).count()
        duration = CallHistory.objects.filter(employee=req.user.id).aggregate(duration=Sum('duration'))['duration']/60
        return Response({
            "calls":noofcalls,
            "duration":duration
        })

@api_view(['GET'])
def getClient(req):
    users = CustomUser.objects.filter(post="C")  # Filter users where post="C"
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getEmployee(req):
    users = CustomUser.objects.filter(post="E")  # Filter users where post="C"
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)

class CallAnalysisByEmployeeView(generics.ListAPIView):
    serializer_class = CallAnalysisSerializer

    def get_queryset(self):
        # Assuming 'employee_id' is passed as a query parameter

        
        # Filter CallHistory instances by employee_id
        if(self.request.user.post == 'M'):

            # Get CallAnalysis instances related to filtered call_histories
            call_analyses = CallAnalysis.objects.all()
            
            return call_analyses
        else:
            call_histories = CallHistory.objects.filter(employee_id=self.request.user.id)

            # Get CallAnalysis instances related to filtered call_histories
            call_analyses = CallAnalysis.objects.filter(call__in=call_histories)
            
            return call_analyses
    
@api_view(['GET'])
def employee_call_summary(request):
    # Get employees' IDs, their total call duration, sum of compound scores,
    # username, total number of calls attended, and average compound score
    employees_summary = CustomUser.objects.filter(post='E').annotate(
        total_duration=Sum('employee_call_history__duration'),
        total_compound_score=Sum('employee_call_history__callanalysis__compound_score'),
        total_calls=Count('employee_call_history'),
        avg_compound_score=Avg('employee_call_history__callanalysis__compound_score')
    ).values('id', 'username', 'total_duration', 'total_compound_score', 'total_calls', 'avg_compound_score')

    # Convert QuerySet to a list for JSON serialization
    employees_summary_list = list(employees_summary)

    return JsonResponse({'employees_summary': employees_summary_list})
    
class FeedBackViewSet(viewsets.ModelViewSet):
    queryset = FeedBack.objects.all()
    serializer_class = FeedBackSerializer

@api_view(['POST'])
def createFeedBack(req):
    to = req.data.get("to")
    to = CustomUser.objects.get(pk=to)
    ins = FeedBack(
        feedbackFrom=req.user,
        feedbackTo=to,
        data=req.data.get("data")
    )
    inss = FeedBackSerializer(ins)
    
    ins.save()
    return Response(inss.data)

@api_view(['GET'])
def getFeedBack(req):
    feeds = FeedBack.objects.filter(feedbackTo=req.user.id)
    serializer = FeedBackSerializer(feeds, many=True)
    return Response(serializer.data)
    


