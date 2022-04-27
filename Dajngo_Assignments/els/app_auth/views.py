from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from app_auth.decorators import *
from app_auth.models import *
from app_auth.forms import *

# Create your views here.
def reg_view(request):
    form = UserRegistrationForm()
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Account Created successfully !')
            return redirect('login')

    context = {
        'form':form
    }
    return render(request, 'app_auth/reg.html', context)

def login_view(request):
    if request.user.is_authenticated:
        return redirect('dashboard')
    else:
        if request.method == 'POST':
            username = request.POST.get('username', None)
            password = request.POST.get('password', None)

            user = authenticate(username = username, password = password)
            if user is not None:
                login(request, user)
                next_url = request.GET.get('next',None)
                if next_url:
                    return redirect(next_url)
                else:
                    return redirect('dashboard')
            else:
                messages.error(request,"Username or Password didn't match. Please try again!")

    return render(request, 'app_auth/login.html')



@login_required(login_url='login')
def logout_view(request):
    logout(request)
    return redirect('login')


@login_required(login_url='login')
def dashboard_view(request):
    return render(request, 'app_auth/dashboard.html')


# -----Teacher-----

@login_required(login_url='login')
@user_is_teacher
def teacher_add_exam_view(request):
    teacher = CustomUser.objects.get(id = request.user.id)
    # print(teacher)
    role = request.user.role
    form = QuizTitleForm()
    if role == 'Teacher':
        if request.method=='POST':
            form = QuizTitleForm(request.POST)
            if form.is_valid():
                newForm = form.save(commit=False)
                newForm.teacher = teacher
                newForm.save()
                return redirect('questions')

    context = {
        'form': form,
    }
    return render(request, 'app_auth/quiz_title.html', context)


# Update Quiz Title View using API
@login_required(login_url='login')
@user_is_teacher
def update_quiztitle_api_view(request, pk):
    quiz_title_info = QuizTitle.objects.get(id=pk)
    form = QuizTitleForm(instance= quiz_title_info)
    

    context = {
        'form':form,
        'pk':pk,
    }
    return render(request, 'app_auth/quiztitleupdate.html', context)


@login_required(login_url='login')
@user_is_teacher
def update_quiztitle_api_save_view(request, pk):
    quiz_title_info = QuizTitle.objects.get(id=pk)
    form = QuizTitleForm(instance= quiz_title_info)
    role = request.user.role
    if role == 'Teacher':
        if request.method=='POST':
            form = QuizTitleForm(request.POST, instance= quiz_title_info)
            if form.is_valid():
                form.save()
                return redirect('QuizAndQuestionsList', pk)

    return redirect('QuizAndQuestionsList', pk)


@login_required(login_url='login')
@user_is_teacher
def update_quiz_question_api_view(request, pk):
    quiz_question_info = Question.objects.get(id=pk)
    form = QuestionUpdateForm(instance= quiz_question_info)

    context = {
        'form':form,
        'pk':pk,
    }
    return render(request, 'app_auth/quizquestionupdate.html', context)


@login_required(login_url='login')
@user_is_teacher
def update_quiz_question_api_save_view(request, pk):
    quiz_question_info = Question.objects.get(id=pk)
    quiz_id = quiz_question_info.quiz.id
    form = QuestionUpdateForm(instance= quiz_question_info)
    role = request.user.role
    if role == 'Teacher':
        if request.method=='POST':
            form = QuestionUpdateForm(request.POST, instance= quiz_question_info)
            if form.is_valid():
                form.save()
                return redirect('QuizAndQuestionsList', quiz_id)

    return redirect('QuizAndQuestionsList', pk)


@login_required(login_url='login')
@user_is_teacher
def delete_quiz_view(request, pk):
    role = request.user.role
    if role == 'Teacher':
        QuizTitle.objects.get(id=pk).delete()
    return redirect('quizview')


@login_required(login_url='login')
@user_is_teacher
def teacher_add_question_view(request):
    form = QuestionForm()
    if request.method=='POST':
        form = QuestionForm(request.POST)
        if form.is_valid():
            newForm = form.save(commit=False)
            quiz = QuizTitle.objects.get(id=request.POST.get('quizID'))
            newForm.quiz = quiz
            newForm.save()
            return redirect('quizview')

    context = {
        'form': form,
    }
    return render(request, 'app_auth/question.html', context)

@login_required(login_url='login')
@user_is_teacher
def teacher_quiz_view(request):
    quizes = QuizTitle.objects.filter(teacher = request.user)
    context = {'quizes': quizes}
    return render(request, 'app_auth/quizview.html', context)



@login_required(login_url='login')
@user_is_teacher
def quiz_and_questions_list_edit_view(request, pk):
    quiz = get_object_or_404(QuizTitle,id=pk)
    questions = Question.objects.filter(quiz__id = pk)
    context = {
        'quiz':quiz,
        'questions':questions,
    }

    return render(request, 'app_auth/QuizAndQuestionsListEdit.html', context)



@login_required(login_url='login')
@user_is_teacher
def teacher_create_articles_view(request):
    teacher = CustomUser.objects.get(id = request.user.id)
    role = request.user.role
    form = TeacherUploadArticlesForm()

    if role == 'Teacher':
        if request.method=='POST':
            form = TeacherUploadArticlesForm(request.POST)
            if form.is_valid():
                newForm = form.save(commit=False)
                newForm.teacher = teacher
                newForm.save()
                return redirect('articlescreatedlist')

    context = {
        'form':form,
    }

    return render(request, 'app_auth/create_article.html', context)


@login_required(login_url='login')
@user_is_teacher
def teacher_created_articles_list_view(request):
    articles_list = TeacherUploadArticles.objects.all().order_by('-created_at')

    context = {
        'articles':articles_list,
    }
    return render(request, 'app_auth/articles_created_list.html', context)


@login_required(login_url='login')
@user_is_teacher
def update_teacher__created_article_view(request, pk):
    article_info = TeacherUploadArticles.objects.get(id=pk)

    teacher = CustomUser.objects.get(id = request.user.id)
    role = request.user.role
    form = TeacherUploadArticlesForm(instance= article_info)

    if role == 'Teacher':
        if request.method=='POST':
            form = TeacherUploadArticlesForm(request.POST, instance= article_info)
            if form.is_valid():
                newForm = form.save(commit=False)
                newForm.teacher = teacher
                newForm.save()
                return redirect('articlescreatedlist')

    context = {
        'form':form,
    }

    return render(request, 'app_auth/update_created_article.html', context) 


@login_required(login_url='login')
@user_is_teacher
def delete_created_article_view(request, pk):
    role = request.user.role
    if role == 'Teacher':
        TeacherUploadArticles.objects.get(id=pk).delete()
    return redirect('articlescreatedlist')


# ---- Students -----
@login_required(login_url='login')
@user_is_student
def student_articles_list_view(request):
    articles_list = TeacherUploadArticles.objects.all().order_by('-created_at')

    context = {
        'articles':articles_list,
    }
    return render(request, 'app_auth/student_articles_view_list.html', context)


@login_required(login_url='login')
@user_is_student
def student_articles_details_view(request, pk):
    role = request.user.role
    if role == 'Student':
        article_info = TeacherUploadArticles.objects.get(id=pk)
    
    context = {
        'article_info':article_info,
    }
    return render(request, 'app_auth/student_articles_view_details.html', context)


@login_required(login_url='login')
@user_is_student
def create_question_forum_view(request):
    form = ForumForm()
    if request.method == 'POST':
        form = ForumForm(request.POST)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.topic_starter = request.user
            new_form.save()
            return redirect('listofforums')
        else:
            form = ForumForm()
    context = {
        'form':form
    }
    return render(request,'app_auth/create_forum.html', context)



def forum_list_view(request):
    forum_list = Forum.objects.all().order_by('-created_at')

    context = {
        'forums':forum_list,
    }
    return render(request, 'app_auth/forum_list.html', context)


def forum_answer_view(request, pk):
    forum = get_object_or_404(Forum,pk=pk)
    form = DiscussionForm()
    if request.method == 'POST' and request.user.is_authenticated:
        form = DiscussionForm(request.POST)
        if form.is_valid():
            new_form = form.save(commit=False)
            new_form.forum = forum
            new_form.discusser = request.user
            new_form.save()
            return redirect('forumdiscussion',pk)
        else:
            form = DiscussionForm()
    else:
        form = DiscussionForm()
    context = {
        'forum':forum,
        'form':form,
    }
    return render(request,'app_auth/answer_forum.html',context)


@login_required(login_url='login')
@user_is_student
def student_exam_list(request):
    quizes = QuizTitle.objects.all().order_by('-id')
    context = {'quizes': quizes}
    return render(request, 'app_auth/examlist.html', context)


@login_required(login_url='login')
@user_is_student
def student_exam_view(request, pk):
    quiz = get_object_or_404(QuizTitle,id=pk)
    total_questions = quiz.quizheader.count()
    tca = 0
    result = Result.objects.filter(student=request.user, quizname=quiz)

    if result:
        result = result[0]

    if request.method == 'POST':
        for key, val in request.POST.items():
            # print(val)
            if 'question' in key:
                qid = int(key.split('=')[1])
                question = Question.objects.get(id=qid)
                # print(question.answer, val)
                if question.answer == val:
                    StudentAnswer.objects.create(student=request.user, quiztitle=quiz, questions=question, select_answered=val, is_correct=True)
                    tca += 1
                else:
                    StudentAnswer.objects.create(student=request.user, quiztitle=quiz, questions=question, select_answered=val)
        
        score = round((tca*100)/total_questions, 2)
        Result.objects.create(quizname=quiz, student=request.user, total_score=score, total_correct_answer=tca)
        return student_exam_list(request)


    context = {
        'quiz':quiz,
        'result':result,
        'total_questions':total_questions,
    }

    return render(request, 'app_auth/examdetailsview.html', context)





