from attr import fields
from django import forms
from django.contrib.auth.forms import UserCreationForm
from app_auth.models import *

class UserRegistrationForm(UserCreationForm):
    class Meta:
        model = CustomUser
        fields = ['username','email','phone','role']

class QuizTitleForm(forms.ModelForm):
    class Meta:
        model=QuizTitle
        fields=['quiz_name','total_questions','total_marks']

class QuestionForm(forms.ModelForm):

    quizID=forms.ModelChoiceField(queryset=QuizTitle.objects.all(),empty_label="Quiz Title", to_field_name="id")
    class Meta:
        model=Question
        fields=['quizID','question','marks','option1','option2','option3','option4','answer']
        widgets = {
            'question': forms.Textarea(attrs={'rows': 3, 'cols': 50})
        }

class QuestionUpdateForm(forms.ModelForm):
    class Meta:
        model=Question
        fields=['question','marks','option1','option2','option3','option4','answer']
        widgets = {
            'question': forms.Textarea(attrs={'rows': 3, 'cols': 50})
        }



class TeacherUploadArticlesForm(forms.ModelForm):
    class Meta:
        model = TeacherUploadArticles
        fields = ['categories', 'title', 'article']



class ForumForm(forms.ModelForm):
    class Meta:
        model = Forum
        fields = ['topic', 'description']


class DiscussionForm(forms.ModelForm):
    class Meta:
        model = Discussion
        fields = ['discuss']

