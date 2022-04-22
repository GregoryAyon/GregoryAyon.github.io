from django.db import models
from django.urls import reverse
# Create your models here.

class Category(models.Model):
    category = models.CharField(max_length=255,unique=True)
    def __str__(self):
        return f'{self.category}'

        
class Video(models.Model):
    vidurl = models.URLField(null=True,default='https://www.youtube.com/embed/')
    title = models.CharField(max_length=999,null=True)
    details = models.TextField(max_length=99999,null=True)
    category = models.ForeignKey(Category,on_delete=models.SET_NULL,null=True)
    runtime = models.CharField(max_length=255,null=True)
    tviews = models.IntegerField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.title}'

class Comment(models.Model):
    video = models.ForeignKey(Video,on_delete=models.CASCADE,null=True)
    username = models.CharField(max_length=255,null=True)
    comment = models.TextField(max_length=9999,null=True)
    email = models.EmailField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.username} {self.email}'
