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

