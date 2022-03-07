from email import message
from .serializers import ProductSerializer, CategorySerializer, UserSerializer, UserSerializerWithToken, CartSerializer
from .models import Product, Category, Cart, CartItem
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status
from selenium import webdriver
from bs4 import BeautifulSoup
import time

from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
# Create your views here.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v

        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET'])
def getRoutes(request):
    routes = ['sagar/potnis']
    return Response(routes)


@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get('keyword')
    # print('query' + query)
    if query == None:
        query = ''

    products = Product.objects.filter(product_name__icontains=query)
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(pk=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCategories(request):
    category = Category.objects.all()
    serializer = CategorySerializer(category, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCategory(request, pk):
    category = Product.objects.filter(category_id=pk)
    serializer = ProductSerializer(category, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def registerUser(request):
    try:
        data = request.data
        user = User.objects.create(
            # data['name'] will come from the frontend
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            # it will hash the password
            password=make_password(data['password'])
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:  # EXCEPT BLock when new user registers with same credentials
        message = {
            'detail': 'User with this email already exists. Try another one'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


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


@api_view(['POST'])
@permission_classes([IsAdminUser])
def addProduct(request):
    data = request.data
    category = Category.objects.get(category_name=data['category'])
    product = Product.objects.create(
        category=category,
        product_name=data['product_name'],
        price_walmart=data['price_walmart'],
        price_sobeys=data['price_sobeys'],
        price_zehrs=data['price_zehrs'],
        walmart_url=data['walmart_url'],
        sobeys_url=data['sobeys_url'],
        zehrs_url=data['zehrs_url'],
        description=data['description'],
    )
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def editProduct(request, pk):
    product = Product.objects.get(id=pk)

    data = request.data
    if (data['category'].isdigit()):
        category = Category.objects.get(id=data['category'])
    else:
        category = Category.objects.get(category_name=data['category'])
    product.category = category
    product.product_name = data['product_name']
    product.price_walmart = data['price_walmart']
    product.price_sobeys = data['price_sobeys']
    product.price_zehrs = data['price_zehrs']
    product.walmart_url = data['walmart_url']
    product.sobeys_url = data['sobeys_url']
    product.zehrs_url = data['zehrs_url']
    product.description = data['description']

    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(id=pk)
    product.delete()

    return Response('Product was deleted!')
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addCartItems(request):
    user = request.user
    data = request.data

    cartItems = data['cartItems']


    if cartItems and len(cartItems) == 0:
        return Response({'detail': 'No Order Items'}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # Create order
        order = Cart.objects.create(
            user=user,
            total_price_walmart=data['totalPrice_walmart'],
            total_price_sobeys=data['totalPrice_sobeys'],
            total_price_zehrs=data['totalPrice_zehrs'],
        )
        # Create order items and set order to orderItem relationship
        for i in cartItems:
            product = Product.objects.get(pk=i['product_id'])

            item = CartItem.objects.create(
                product=product,
                cart=order,
                name=product.product_name,
                quantity=i['qty'],
                price_walmart=i['price_walmart'],
                price_sobeys=i['price_sobeys'],
                price_zehrs=i['price_zehrs'],
                img=i['image'],
            )
            item.save()

        serializer = CartSerializer(order, many=False)
        return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getOrderById(request, pk):

    user = request.user

    try:
        order = Cart.objects.get(pk=pk)
        if user.is_staff or order.user == user:
            serializer = CartSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorized to view this order'},
                     status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Shopping List does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getMyOrders(request):
    user = request.user
    orders = user.cart_set.all()
    print(orders)
    serializer = CartSerializer(orders, many=True)
    return Response(serializer.data)
