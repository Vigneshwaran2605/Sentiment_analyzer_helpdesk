from django.contrib.auth.models import AbstractUser
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.translation import gettext as _

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
    duration = models.IntegerField()
    date = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.employee.post != 'E':
            raise ValidationError(_('Other users cannot be added as employees in CallHistory.'))
        if self.client.post != 'C':
            raise ValidationError(_('Other users cannot be added as Client in CallHistory.'))
        
        super().clean()

