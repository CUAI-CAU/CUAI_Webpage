# quiz/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('questions', views.get_questions, name='get_questions'),
    path('admin/questions', views.admin_questions, name='admin_questions'),
    path('admin/members', views.admin_members, name='admin_members'),
    path('admin/member-summary', views.admin_member_summary, name='admin_member_summary'),
    path('submission-status', views.submission_status, name='submission_status'),
    path('verification', views.verification, name='verification'),
    path('submit', views.submit, name='submit'),
    path('updatequestions', views.updatequestions, name='updatequestions'),
    path('viewlog', views.viewlog, name='viewlog'),
]
