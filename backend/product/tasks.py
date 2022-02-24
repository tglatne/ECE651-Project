from celery import shared_task
from selenium import webdriver
from bs4 import BeautifulSoup
import time
from .models import *
#from .web_scrapper import webscrap

# @shared_task(bind=True)
# def my_webscrap():
#     webscrap()

# @shared_task(bind=True)
# def my_test(self):
#     print("scheduled hi")

@shared_task(bind=True)
def my_test(self):
     products = Product.objects.all()
     for product in products.iterator():
        class_walmart = 'css-2vqe5n esdkp3p0'
        #class_sobeys = 'text__Text-sc-1ddlex6-0 hgqPwo'
        class_zehrs = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value'
        url_class_dict = {product.zehrs_url : class_zehrs, product.walmart_url : class_walmart}
        
        # for key in range(len(url_class_dict)):
        for key in url_class_dict.keys():
            options = webdriver.ChromeOptions()
            options.add_argument("--enable-javascript")
            driver = webdriver.Chrome('I:/EDUCATIONAL/MASTERS/ECE651/SmartWalletSaver/ECE651-Project/backend/product/chromedriver.exe', options=options)
            driver.get(key)
            time.sleep(5)
            html = driver.page_source
            soup = BeautifulSoup(html, 'lxml')
            soup = soup.find('span', class_= url_class_dict[key])
            price = soup.text
            price = str(price)
            if '$' in price:
                price = price[1:]
                price = float(price)
            else:
                price = price[:len(price) - 1]
                price = float(price) / 100
            print(key," ", price )
            driver.quit()
            time.sleep(5)

