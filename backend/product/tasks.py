from celery import shared_task
from .models import *
from selenium import webdriver
from bs4 import BeautifulSoup
import time



@shared_task(bind=True)
def my_test(self):
    flag = False
    products = Product.objects.all()
    count_error = 0
    for product in products.iterator():
        class_walmart = 'css-2vqe5n esdkp3p0'
        class_sobeys = 'text__Text-sc-1ddlex6-0 hgqPwo'
        class_zehrs = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value'
        url_class_dict = {product.walmart_url : class_walmart, product.sobeys_url : class_sobeys, product.zehrs_url : class_zehrs}

        for key in url_class_dict.keys():
            options = webdriver.ChromeOptions()
            options.add_argument("--enable-javascript")
            driver = webdriver.Chrome('D:/Waterloo/Winter 22/ECE 651/ECE651-Project/backend/product/chromedriver.exe',
                                      options=options)
            driver.get(key)
            time.sleep(5)
            html = driver.page_source
            soup = BeautifulSoup(html, 'lxml')
            soup_str = str(soup)
            if 'css-2vqe5n esdkp3p0' in soup_str:
                print("found class in walmart")
                flag = False
            elif 'text__Text-sc-1ddlex6-0 hgqPwo' in soup_str or 'text__Text-sc-1ddlex6-0 offer__Offer-sc-1atj9an-0 hgqPwo eZJjBz' in soup_str:
                print("found class in sobeys")
                flag = False
            elif 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value'   in soup_str or 'price__value selling-price-list__item__price selling-price-list__item__price--now-price selling-price-list__item__price--__value' in soup_str:
                print("found class in zehrs")
                flag = False
            else:
                flag = True

            if flag == False:
                if 'text__Text-sc-1ddlex6-0 offer__Offer-sc-1atj9an-0 hgqPwo eZJjBz' in soup_str:
                    url_class_dict[product.sobeys_url] = 'text__Text-sc-1ddlex6-0 offer__Offer-sc-1atj9an-0 hgqPwo eZJjBz'
                if 'price__value selling-price-list__item__price selling-price-list__item__price--now-price selling-price-list__item__price--__value' in soup_str:
                    print("found in zehrs")
                    url_class_dict[product.zehrs_url] = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price selling-price-list__item__price--__value'
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
                if 'walmart' in key:
                    Product.objects.filter(product_name = product.product_name).update(price_walmart = price)

                elif 'zehrs' in key:
                    Product.objects.filter(product_name = product.product_name).update(price_zehrs = price)

                elif 'voila' in key:
                    Product.objects.filter(product_name = product.product_name).update(price_sobeys = price)

            else:
                count_error+=1
                print("some ERRRRRRRRRRRRRRRRRRRRRRRORRRRR :" , count_error)
                driver.quit()
                continue












