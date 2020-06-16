from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Contact(models.Model):
    name = models.CharField(max_length=100)
    phone = models.IntegerField(unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
