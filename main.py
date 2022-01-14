# This will not run on online IDE
import requests
from bs4 import BeautifulSoup
#
URL = "https://www.instacart.com/store/search/eggs?actid=d2421e53-d849-456b-9e29-6c2814e35065&search_id=4a35767e-e0fc-44e0-977e-253e29498b62&page_view_id=f11360ca-4a86-4306-bfb7-c29691129006"
r = requests.get(URL)

soup = BeautifulSoup(r.content,
                     'html5lib')  # If this line causes an error, run 'pip install html5lib' or install html5lib
# soup = soup.find('span')
print(soup)

# from requests_html import HTMLSession
# session= HTMLSession()
# r = session.get('https://www.walmart.ca/search?q=banana')
# soup = BeautifulSoup(r.content, 'html5lib')
# print(soup.prettify())