from django.urls import path
from .views import get_products, get_product, get_cart, add_to_cart, remove_from_cart

urlpatterns = [
    path('', get_products),
    path('<int:id>/', get_product),
    path("cart/", get_cart),
    path("cart/add/", add_to_cart),
    path("cart/remove/<int:product_id>/", remove_from_cart),
]