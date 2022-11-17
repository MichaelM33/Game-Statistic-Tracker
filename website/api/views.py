from multiprocessing import AuthenticationError
from pickle import FALSE
from django.http import HttpResponse
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializer import testSerializers
from .models import test


#Token based Authentiction 
from rest_framework.permissions import IsAuthenticated





@api_view(['GET'])
def index(request):
    api_urls = {
        'Users':'/user-list/',
        'Passwords': '/password-list/',
    }
    return Response(api_urls)




@api_view(['GET'])
def user(request):

    data = test.objects.all()
    serializer = testSerializers(data, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def usermore(request, username):

    data = test.objects.get(username=username)
    serializer = testSerializers(data, many=False)
    return Response(serializer.data)

@api_view(['POST'])
def usercreate(request):

    serializer = testSerializers(data=request.data)

    if serializer.is_valid():
        
        serializer.save()
        return Response(serializer.data, status = status.HTTP_201_CREATED)
    else:
        return Response(serializer.data, status = status.HTTP_406_NOT_ACCEPTABLE)


from django.shortcuts import render
from django.template import loader
from . import league as l
import json


@api_view(['POST'])
def profile(request):

    api_key="RGAPI-9465b141-2119-41dc-838f-c41c209d9bfb"
    username = "itsmj33"
    args = {}
    user = request.data
    username = user["user"]
    player = l.Player(api_key, username)

    try:
        args = player.status_check
        return Response(args, status = status.HTTP_204_NO_CONTENT)

    except:
        args = player.json
        try:
            args = player.status_code
        except:
            args = player.json
    
    #return render(request, 'info.html', args)
    return Response(args, status = status.HTTP_202_ACCEPTED)


@api_view(['POST'])
def match(request):

    api_key="RGAPI-9465b141-2119-41dc-838f-c41c209d9bfb"
    username = "itsmj33"
    args = {}
    user = request.data
    username = user["user"]
    number = user["amount"]
    player = l.Match(api_key, username, number)

    try:
        args = player.status_check
        return Response(args, status = status.HTTP_204_NO_CONTENT)

    except:
        args = player.json
        try:
            args = player.status_code
        except:
            args = player.json
    
    #return render(request, 'info.html', args)
    return Response(args, status = status.HTTP_202_ACCEPTED)
