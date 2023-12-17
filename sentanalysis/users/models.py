from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext as _

from .managers import CustomUserManager

class CustomUser(AbstractUser):
    email = models.EmailField(_('email address'), unique=True)
    post_CHOICES = (
        ('M','Manager'),
        ('E','Employee'),
    )
    post = models.CharField(max_length=1, choices=post_CHOICES, default="E")

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ('username',post)

    objects = CustomUserManager()

    def __str__(self):
        return self.email

