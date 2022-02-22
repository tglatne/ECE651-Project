from celery import shared_task
from .models import *
#from .web_scrapper import webscrap

# @shared_task(bind=True)
# def my_webscrap():
#     webscrap()

@shared_task(bind=True)
def my_test(self):
    print("scheduled hi")


