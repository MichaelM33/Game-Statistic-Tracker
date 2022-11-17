from dataclasses import fields
from rest_framework import serializers
from .models import test

class testSerializers(serializers.ModelSerializer):
    class Meta:
        model = test
        fields = ['id', 'username', 'email']
