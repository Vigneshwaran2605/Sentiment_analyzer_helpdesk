from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import *

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['email'] = user.email
        token['post'] = user.post
        token['username'] = user.username


        # ...

        return token
    

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','username', 'email']

class CallHistorySerializer(serializers.ModelSerializer):
    client = CustomUserSerializer(read_only=True)
    employee = CustomUserSerializer(read_only=True)

    class Meta:
        model = CallHistory
        fields = ('id', 'client', 'employee', 'callRecord', 'duration', 'date')
        read_only_fields = ('id', 'client', 'employee')

class CallAnalysisSerializer(serializers.ModelSerializer):
    client_username = serializers.SerializerMethodField()

    class Meta:
        model = CallAnalysis
        fields = ('id', 'client_username', 'tts', 'negative_score', 'positive_score', 'neutral_score', 'compound_score', 'Emotion', 'call')
        read_only_fields = ('id', 'client_username', 'tts', 'negative_score', 'positive_score', 'neutral_score', 'compound_score', 'Emotion', 'call')

    def get_client_username(self, obj):
        if obj.call:
            return obj.call.client.username
        return None
    
class FeedBackSerializer(serializers.ModelSerializer):
    feedbackFrom = CustomUserSerializer()
    feedbackTo = CustomUserSerializer()
    class Meta:
        model = FeedBack
        fields = ['id', 'feedbackFrom', 'feedbackTo', 'data']
