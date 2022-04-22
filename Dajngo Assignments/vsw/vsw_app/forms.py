from django import forms
from vsw_app.models import *

class CommentForm(forms.ModelForm):
    class Meta:
        model = Comment
        fields = ('username','email','comment')

        widgets = {
            'username': forms.TextInput(attrs={'class': 'form-control','placeholder': 'Name'}),
            'email': forms.EmailInput(attrs={'class': 'form-control','placeholder': 'Email'}),
            'comment': forms.Textarea(attrs={'class': 'form-control','cols':'40','rows':'5','placeholder': 'Comment'}),
        }