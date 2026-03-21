from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product

# Create your views here.

@api_view(['GET'])
def get_products(request):
    products = Product.objects.all()

    data = []
    for product in products:
        data.append({
            "id": product.id,
            "name": product.name,
            "price": product.price,
            "image": request.build_absolute_uri(product.image.url) if product.image else None
        })
    
    return Response(data)