from .serializers import ProductSerializer
from rest_framework import viewsets
from .models import Product
# from backend.webscraper import webscrap
from selenium import webdriver
from bs4 import BeautifulSoup
import time

# Create your views here.


class ProductView(viewsets.ModelViewSet):
    options = webdriver.ChromeOptions()
    options.add_argument("--enable-javascript")
    driver = webdriver.Chrome('../chromedriver', options=options)
    URL = 'https://www.zehrs.ca/search?search-bar=banana'
    driver.get(URL)
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    soup = soup.find('span' , class_ = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value')
    price = soup.text
    price = str(price)
    price = price[1:]
    price = float(price)
    print(price)
    Product.objects.filter(pk = 1).update(product_price = price)
    # reg.save()
    serializer_class = ProductSerializer
    queryset = Product.objects.all()