from django.shortcuts import redirect, render
from vsw_app.forms import CommentForm
from vsw_app.models import *

# Create your views here.
def index(request):
    videos = Video.objects.all().order_by('-id')
    context = {
        'videos': videos
    }
    return render(request, 'vsw_app/index.html', context)

def video_details(request, pk):
    videos = Video.objects.all().order_by('-id')
    video = Video.objects.get(id = pk)
    comments = Comment.objects.filter(video__id = pk).order_by('-id')
    form = CommentForm()
    if request.method == "POST":
        form = CommentForm(request.POST)
        if form.is_valid():
            newform = form.save(commit=False)
            newform.video = video
            newform.save()
            return redirect('video_details', pk)

    context = {
        'video':video,
        'videos':videos,
        'form':form,
        'comments':comments
    }
    return render(request, 'vsw_app/video_details.html', context)

def search_video_content(request):
    title = request.POST.get('title')
    if len(title) > 1:
        video_list = Video.objects.filter(title__icontains = title)
    else:
        video_list = []

    return render(request, 'vsw_app/search_result.html', {'video_list': video_list})