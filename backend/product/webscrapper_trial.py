from selenium import webdriver
from bs4 import BeautifulSoup
import time
from .models import *

def webscrap():
    options = webdriver.ChromeOptions()
    options.add_argument("--enable-javascript")
    driver = webdriver.Chrome('chromedriver', options=options)
    URL = "https://www.walmart.ca/search?q=banana"
    driver.get(URL)
    time.sleep(5)
    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    soup = soup.find('span', class_='css-2vqe5n esdkp3p0')
    price = soup.text
    price = str(price)
    if '$' in price:
        price = price[1:]
        price = float(price)
    else:
        price = price[:len(price)-1]
        price = float(price)/100

    print(price)
    Product.objects.filter(product_name = 'Banana').update(price_walmart=price)
    driver.quit()
