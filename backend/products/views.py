from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product, CartItem
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

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

@api_view(['GET'])
def get_product(request, id):
    product = Product.objects.get(id=id)

    return Response({
        "id": product.id,
        "name": product.name,
        "description": product.description,
        "price": product.price,
        "image": request.build_absolute_uri(product.image.url) if product.image else None
    })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    user = request.user
    product_id = request.data.get("product_id")

    product = Product.objects.get(id=product_id)
    
    item, created = CartItem.objects.get_or_create(user=user, product=product)
    if not created:
        item.quantity += 1
        item.save()

    return Response({"message": "Added to Cart"})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_cart(request):
    user = request.user
    items = CartItem.objects.filter(user=user)

    data = []
    for item in items:
        data.append({
            "id": item.product.id,
            "name": item.product.name,
            "price": item.product.price,
            "qty": item.quantity,
        })

    return Response(data)


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def remove_from_cart(request, product_id):
    user = request.user
    CartItem.objects.filter(user=user, product_id=product_id).delete()
    return Response({"message": "Item Removed"})

