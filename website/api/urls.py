
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    path('user/', views.user),
    path('user-create/', views.usercreate),
    path('user-info/<str:username>/', views.usermore, name="user-info"),
    path('lol/profile', views.profile),
    path('lol/match', views.match),
    
]