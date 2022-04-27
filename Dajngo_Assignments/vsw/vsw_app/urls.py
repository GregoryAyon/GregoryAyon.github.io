from django.urls import path
from vsw_app import views

urlpatterns = [
    path('', views.index, name='index'),
    path('watch/video/<int:pk>', views.video_details, name='video_details'),
    path('search_results/', views.search_video_content,name='search_results'),
]