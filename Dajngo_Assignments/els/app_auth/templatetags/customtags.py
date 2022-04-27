from django import template
from app_auth.models import Result

register = template.Library()

@register.filter
def isResultComplete(qz,user):
    result = Result.objects.filter(student=user, quizname=qz)
    is_result = True if result else False
    return is_result