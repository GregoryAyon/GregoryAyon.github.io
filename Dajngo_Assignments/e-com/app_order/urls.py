from django.urls import path
from app_order import views

app_name = 'app_order'

urlpatterns = [
    path('add/<pk>/', views.add_to_cart, name="add"),
    path('remove/<pk>/', views.remove_from_cart, name="remove"),
    path('cart/', views.cart_view, name="cart"),
    path('increase/<pk>/', views.increase_cart, name="increase"),
    path('decrease/<pk>/', views.decrease_cart, name="decrease"),
    path('applycoupon/<int:order_id>/', views.apply_coupon_view, name="applycoupon"),
    path('removecoupon/<int:order_id>/', views.remove_coupon_view, name="removecoupon"),
]
