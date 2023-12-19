from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext as _
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
import subprocess
from models.analysis import analyze_sentiment

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    post_CHOICES = (
        ('M', 'Manager'),
        ('E', 'Employee'),
        ('C', 'Client'),
    )
    post = models.CharField(max_length=1, choices=post_CHOICES, default="E")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  # Assuming 'username' is a required field

    objects = CustomUserManager()

    def __str__(self):
        return self.email

class CallHistory(models.Model):
    client = models.ForeignKey(CustomUser, related_name='client_call_history', on_delete=models.CASCADE)
    employee = models.ForeignKey(CustomUser, related_name='employee_call_history', on_delete=models.CASCADE)
    callRecord = models.FileField(upload_to="calls")
    duration = models.IntegerField(default=0)
    date = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.employee.post != 'E':
            raise ValidationError(_('Other users cannot be added as employees in CallHistory.'))
        if self.client.post != 'C':
            raise ValidationError(_('Other users cannot be added as Client in CallHistory.'))
        
        super().clean()

class CallAnalysis(models.Model):
    call = models.ForeignKey(CallHistory, on_delete=models.CASCADE)
    tts = models.TextField()
    negative_score = models.DecimalField(max_digits=12, decimal_places=5)
    positive_score = models.DecimalField(max_digits=12, decimal_places=5)
    neutral_score = models.DecimalField(max_digits=12, decimal_places=5)
    compound_score = models.DecimalField(max_digits=12, decimal_places=5)
    Emotion = models.CharField(max_length=30)


@receiver(post_save, sender=CallHistory)
def update_duration(sender, instance, created, **kwargs):
    if created and instance.callRecord:
        file_path = instance.callRecord.path
        duration_command = f"ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 {file_path}"
        try:
            duration_output = subprocess.check_output(duration_command, shell=True)
            duration_in_seconds = int(float(duration_output))
            instance.duration = duration_in_seconds
            instance.save(update_fields=['duration'])
        except Exception as e:
            # Handle exceptions as per your requirements (e.g., log an error)
            pass


# {'tts': 'I am vigneshwaran', 'score': {'neg': 0.0, 'neu': 1.0, 'pos': 0.0, 'compound': 0.0}, 'emo': 'Neutral'}
@receiver(post_save, sender=CallHistory)
def analyser(sender, instance, created, **kwargs):
    if created and instance.callRecord:
        res = analyze_sentiment(instance.callRecord.path)
        print(res)
        i = CallAnalysis(
            call=instance,
            tts=res["tts"],
            negative_score = res["score"]["neg"],
            positive_score  = res["score"]["pos"],
            neutral_score  = res["score"]["neu"],
            compound_score  = res["score"]["compound"],
            Emotion = res["emo"],
        )
        i.save()