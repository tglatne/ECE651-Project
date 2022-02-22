from rest_framework import serializers
from .models import Product, Category
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'  # will send all data


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = "__all__"


class UserSerializer(serializers.ModelSerializer):
    # 'namee' is a function, we are just initializing it because its a Sirialzier function
    namee = serializers.SerializerMethodField(read_only=True)
    isAdminn = serializers.SerializerMethodField(
        read_only=True)  # same of 'isAdminn'

    class Meta:
        model = User
        fields = ['id',  'username', 'email', 'namee', 'isAdminn']

    def get_isAdminn(self, obj):
        return obj.is_staff

    def get_namee(self, obj):  # we add "get_" because its a serializer function
        name = obj.first_name
        if name == '':
            name = obj.email

        return name


# we have written this class so we get the tokenn that we can use. it is same as "access" field.
class UserSerializerWithToken(UserSerializer):
    # got to api/users/login to see.
    tokenn = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        # we inherit all the fields from the 'UserSerializer' class like namee and isAdminn
        fields = ['id',  'username', 'email', 'namee', 'isAdminn', 'tokenn']

    def get_tokenn(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
