from celery import shared_task
from .models import *
from selenium import webdriver
from bs4 import BeautifulSoup
import time



@shared_task(bind=True)
def my_test(self):
    options = webdriver.ChromeOptions()
    options.add_argument("--enable-javascript")
    driver = webdriver.Chrome('D:/Waterloo/Winter 22/ECE 651/ECE651-Project/backend/product/chromedriver.exe', options=options)
    products = Product.objects.all()
    for product in products.iterator():

        url_walmart = str(product.walmart_url)
        url_sobeys = str(product.sobeys_url)
        url_zehrs = str(product.zehrs_url)
        class_walmart = 'css-2vqe5n esdkp3p0'
        class_sobeys = 'text__Text-sc-1ddlex6-0 hgqPwo'
        class_zehrs = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value'
        url_class_dict = {url_walmart : class_walmart, url_sobeys : class_sobeys, url_zehrs : class_zehrs}
        for key in range(len(url_class_dict)):
            print(key)
            print(type(key))
            driver.get(key)
            time.sleep(5)
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










