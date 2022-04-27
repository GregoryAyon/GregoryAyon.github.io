from django.contrib import admin
from app_auth.models import *

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(TeacherUploadArticles)
admin.site.register(QuizTitle)
admin.site.register(Question)
admin.site.register(Forum)
admin.site.register(Discussion)
admin.site.register(StudentAnswer)
admin.site.register(Result)