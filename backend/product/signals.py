from django.db.models.signals import pre_save
from django.contrib.auth.models import User

# wrote this so everytime we save the Username, it saves username to email. we did this using django sigals
def updateUser(sender, instance, **kwargs):
    # print('signal triggered')
    user = instance
    if user.email != "":
        user.username = user.email


pre_save.connect(updateUser,sender = User)

