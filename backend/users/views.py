from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

@api_view(['POST'])
def register(request):
    email = request.data.get('email')
    password = request.data.get('password')

    if not email or not password:
        return Response({"error": "Email and password required"}, status=400)

    if User.objects.filter(email=email).exists():
        return Response({"error": "User already exists"}, status=400)

    user = User(email=email)
    user.set_password(password)
    user.save()

    return Response({"message": "User created successfully"}, status=201)

@api_view(['POST'])
def login(request):
    print("Request data received:", request.data)
    data = request.data
    user = User.objects.filter(email=data['email']).first()
    print(user.password)
    print(user.check_password(data['password']))

    if user and user.check_password(data['password']):
        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token)
        })
    
    return Response({"message": "Invalid Credentials"}, status=400)

