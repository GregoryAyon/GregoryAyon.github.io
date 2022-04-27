from django.shortcuts import redirect
from functools import wraps
from app_auth.models import *

def user_is_teacher(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if request.user.role == 'Teacher':
            return function(request, *args, **kwargs)
        else:
            return redirect('dashboard')
    return wrap


def user_is_student(function):
    @wraps(function)
    def wrap(request, *args, **kwargs):
        if request.user.role == 'Student':
            return function(request, *args, **kwargs)
        else:
            return redirect('dashboard')
    return wrap