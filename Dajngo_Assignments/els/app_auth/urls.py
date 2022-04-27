from django.urls import path
from django.conf import settings
from django.conf.urls.static import static
from app_auth import views
from django.views.generic import TemplateView

urlpatterns = [
    path('', TemplateView.as_view(template_name="app_auth/index.html")),
    path('login/', views.login_view, name='login'),
    path('registration/', views.reg_view, name='registration'),
    path('logout/', views.logout_view, name='logout'),
    path('dashboard/', views.dashboard_view, name='dashboard'),

    # ------Teacher-----
    path('quizetitle/', views.teacher_add_exam_view, name='quizetitle'),
    path('questions/', views.teacher_add_question_view, name='questions'),
    path('quizview/', views.teacher_quiz_view, name='quizview'),
    path('QuizAndQuestionsList/<int:pk>', views.quiz_and_questions_list_edit_view, name='QuizAndQuestionsList'),
    path('deletequiz/<int:pk>', views.delete_quiz_view, name='deletequiz'),
    path('createarticle/', views.teacher_create_articles_view, name='createarticle'),
    path('articlescreatedlist/', views.teacher_created_articles_list_view, name='articlescreatedlist'),
    path('updatearticle/<int:pk>', views.update_teacher__created_article_view, name='updatearticle'),
    path('deletearticle/<int:pk>', views.delete_created_article_view, name='deletearticle'),

    # -----API-----
    path('api/quiztitleupdate/<int:pk>', views.update_quiztitle_api_view, name='quiztitleupdate'),
    path('api/quiztitleupdatesave/<int:pk>', views.update_quiztitle_api_save_view, name='quiztitleupdatesave'),
    path('api/quizquestionupdate/<int:pk>', views.update_quiz_question_api_view, name='quizquestionupdate'),
    path('api/quizquestioneupdatesave/<int:pk>', views.update_quiz_question_api_save_view, name='quizquestioneupdatesave'),

    # ------Student------
    path('studentarticlelistview/', views.student_articles_list_view, name='studentarticlelistview'),
    path('studentarticledetailsview/<int:pk>', views.student_articles_details_view, name='studentarticledetailsview'),
    path('createforum/', views.create_question_forum_view, name='createforum'),
    path('listofforums/', views.forum_list_view, name='listofforums'),
    path('forumdiscussion/<int:pk>', views.forum_answer_view, name='forumdiscussion'),
    path('examlist', views.student_exam_list, name='examlist'),
    path('examdetails/<int:pk>', views.student_exam_view, name='examdetails'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)