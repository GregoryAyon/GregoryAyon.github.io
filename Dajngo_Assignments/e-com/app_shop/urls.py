from django.urls import path
from app_shop import views

app_name = 'app_shop'

urlpatterns = [
    path('', views.Home.as_view(), name='home'),
    path('SallerUploadProduct/', views.Saller_upload_product, name='SallerUploadProduct'),
    path('product/<pk>/', views.ProductDetail.as_view(), name='product_detail'),
    path('CreateCoupon/', views.create_coupon, name='CreateCoupon'),
    path('sallerproductlist/', views.saller_product_list_view, name='sallerproductlist'),
    path('deleteproduct/<int:pk>', views.saller_product_delete_view, name='deleteproduct'),
]
