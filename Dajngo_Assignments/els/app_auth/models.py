from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    roleType = (
        ('', 'Please Select'),
        ('Student', 'Student'),
        ('Teacher', 'Teacher'),
    )
    role = models.CharField(max_length=255, choices=roleType, null=True, default=roleType[0][0], blank=True)
    phone = models.CharField(max_length=255, null=True, blank=True)
    verify = models.BooleanField(default=False, null=True)
    is_student = models.BooleanField(default=False, null=True)
    is_teacher = models.BooleanField(default=False, null=True)

    def save(self, *args, **kwargs):
        if self.role == 'Student':
            self.is_student = True
        elif self.role == 'Teacher':
            self.is_teacher = True
        
        return super(CustomUser, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.username}"

class TeacherUploadArticles(models.Model):
    categoriesType = (
        ('', 'Please Select'),
        ('How To Articles', 'How To Articles'),
        ('List Articles', 'List Articles'),
        ('Round Up Articles', 'Round Up Articles'),
        ('Guide Articles', 'Guide Articles'),
        ('Comparison Articles', 'Comparison Articles'),
    )
    
    teacher = models.ForeignKey(CustomUser, on_delete=models.SET_NULL, null=True, related_name='Teacher')
    categories = models.CharField(max_length=255, null=True, choices=categoriesType, default=categoriesType[0][0])
    title = models.CharField(max_length=255, null=True)
    article = models.TextField(max_length=1080, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title}"


class QuizTitle(models.Model):
    teacher = models.ForeignKey(CustomUser, on_delete=models.CASCADE, null=True)
    quiz_name = models.CharField(max_length=50, null=True)
    total_questions = models.IntegerField(null=True)
    total_marks = models.IntegerField(null=True)

    def __str__(self):
        return f'{self.quiz_name}'

class Question(models.Model):
    quiz =models.ForeignKey(QuizTitle,on_delete=models.CASCADE, null=True, related_name='quizheader')
    question=models.CharField(max_length=600, null=True)
    marks=models.IntegerField(null=True)
    option1=models.CharField(max_length=200, null=True)
    option2=models.CharField(max_length=200, null=True)
    option3=models.CharField(max_length=200, null=True)
    option4=models.CharField(max_length=200, null=True)
    correct_answert=(('', 'Please Select'),('option1','option1'),('option2','option2'),('option3','option3'),('option4','option4'))
    answer=models.CharField(max_length=200, choices=correct_answert, default=correct_answert[0][0])

    def __str__(self):
        return f'{self.question}'


class StudentAnswer(models.Model):
    quiztitle = models.ForeignKey(QuizTitle,on_delete=models.CASCADE, null=True, related_name='quizname')
    questions=models.ForeignKey(Question,on_delete=models.CASCADE, null=True, related_name='questions')
    student = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True, related_name='studentname')
    select_answered = models.CharField(max_length=255, null=True)
    is_correct = models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return f'{self.select_answered}'


class Result(models.Model):
    quizname = models.ForeignKey(QuizTitle,on_delete=models.CASCADE, null=True, related_name='quiz')
    student = models.ForeignKey(CustomUser,on_delete=models.CASCADE,null=True, related_name='student')
    total_score = models.PositiveIntegerField()
    total_correct_answer = models.PositiveIntegerField()
    created_at=models.DateTimeField(auto_now_add=True,null=True)

    def __str__(self):
        return f'{self.total_score}'



class Forum(models.Model):
    topic_starter = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    topic = models.CharField(max_length=300)
    description = models.TextField(max_length=10000,null=True)
    created_at=models.DateTimeField(auto_now_add=True,null=True)
    
    def __str__(self):
        return str(self.topic)
 
#child model
class Discussion(models.Model):
    forum = models.ForeignKey(Forum,on_delete=models.CASCADE,related_name='discussions')
    discusser = models.ForeignKey(CustomUser,on_delete=models.CASCADE)
    discuss = models.TextField(max_length=10000,null=True)
    created_at=models.DateTimeField(auto_now_add=True,null=True)

    class Meta:
        ordering = ('-created_at',)

    def __str__(self):
        return str(self.forum)
