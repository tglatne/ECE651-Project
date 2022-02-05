from selenium import webdriver
from bs4 import BeautifulSoup
import time

def webscrap():
    options = webdriver.ChromeOptions()
    options.add_argument("--enable-javascript")
    driver = webdriver.Chrome('chromedriver', options=options)
    # URL = "https://www.walmart.ca/search?q=watch"
    URL = 'https://www.zehrs.ca/search?search-bar=banana'
    # URL = 'https://www.realcanadiansuperstore.ca/search?search-bar=banana'

    driver.get(URL)
    time.sleep(5)

    html = driver.page_source
    soup = BeautifulSoup(html, 'lxml')
    # soup = soup.find('span' , class_ = 'css-2vqe5n esdkp3p0')
    soup = soup.find('span' , class_ = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value')
    # soup = soup.find('span' , class_ = 'price__value selling-price-list__item__price selling-price-list__item__price--now-price__value')

    var = print(soup.text)
    driver.quit()
    return var


print("hello from webscrapper")