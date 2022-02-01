from .serializers import *
from rest_framework import viewsets
from .models import *
from selenium import webdriver
from bs4 import BeautifulSoup
import time

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.


@api_view(['GET'])
def getRoutes(request):
    routes = ['sagar/potnis']
    return Response(routes)

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data )


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(pk = pk)
    serializer = ProductSerializer(product, many= False)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many = True)
    return Response(serializer.data)

@api_view(['GET'])
def getCategory(request, pk):
    category = Product.objects.filter(category_id = pk)
    serializer = ProductSerializer(category, many = True)
    return Response(serializer.data)


# class ProductView(viewsets.ModelViewSet):
#     options = webdriver.ChromeOptions()
#     options.add_argument("--enable-javascript")
#     driver = webdriver.Chrome('chromedriver', options=options)
#     URL = 'https://www.zehrs.ca/search?search-bar=banana'
#     driver.get(URL)
#     time.sleep(5)
#     html = driver.page_source
#     soup = BeautifulSoup(html, 'lxml')
#     soup = soup.find('span' , class_ = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value')
#     price = soup.text
#     price = str(price)
#     price = price[1:]
#     price = float(price)
#     print(price)
#     Product.objects.filter(pk = 2).update(product_price = price)
#     # reg.save()
#     serializer_class = ProductSerializer
#     queryset = Product.objects.all()