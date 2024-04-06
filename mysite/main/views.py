from django.shortcuts import render
# import httpresponse
from django.http import HttpResponse


def index(request):
    return HttpResponse("Hello, world. You're at the main index.")
