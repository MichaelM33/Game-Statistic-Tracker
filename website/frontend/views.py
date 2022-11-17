from multiprocessing import AuthenticationError
from pickle import FALSE
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


#Token based Authentiction 
from rest_framework.permissions import IsAuthenticated

from django.shortcuts import render
from django.template import loader


@api_view(['GET'])
def index(request):
    return render(request, 'index.html')



