from django.shortcuts import render, get_object_or_404

# Import views
from django.views.generic import ListView, DetailView

# Models
from django.http import HttpResponse
from django.shortcuts import render, redirect, get_object_or_404
from app_login.models import User
from app_shop.models import Product
from app_shop.forms import *

# Mixin
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.decorators import login_required
from django.contrib import messages
# Create your views here.



class Home(ListView):
    model = Product
    template_name = 'app_shop/home.html'

class ProductDetail(LoginRequiredMixin, DetailView):
    model = Product
    template_name = 'app_shop/product_detail.html'



@login_required(login_url='app_login:login')
def Saller_upload_product(request):
    form = SallerUploadForm()
    # print(request.user.user_type)
    if request.method == "POST" and request.user.user_type == "Saller":
        form = SallerUploadForm(request.POST, request.FILES)
        if form.is_valid():
            product_obj = form.save(commit=False)
            product_obj.product_Saller = request.user
            # print(product_obj)
            product_obj.save()
            messages.success(request, "your product added successfully!")
            return redirect("app_shop:SallerUploadProduct")

        elif request.user.user_type == "Buyer":
            messages.warning(request, "you are not a Saller. Can't add Products")
            return redirect("app_shop:home")


    context ={
        'form': form
    }
    return render(request, 'app_shop/saller_upload_product.html', context)



@login_required(login_url='app_login:login')
def create_coupon(request):
    form = CouponForm()
    if request.method == "POST" and request.user.user_type == "Saller":
        form = CouponForm(request.POST)
        if form.is_valid():
            coupon_obj = form.save(commit=False)
            coupon_obj.vendor = request.user
            coupon_obj.save()
            messages.success(request, "your coupon added successfully!")
            return redirect("app_shop:CreateCoupon")

    context = {
        'form': form,
    }
    return render(request, 'app_shop/create_coupon.html', context)

@login_required(login_url='app_login:login')
def saller_product_list_view(request):
    if request.user.user_type == "Saller":
        products = Product.objects.filter(product_Saller = request.user)

        context = {
            'products':products
        }
        
    else:
        context = {}
        
    return render(request, 'app_shop/saller_product_list.html', context)

@login_required(login_url='app_login:login')
def saller_product_delete_view(request, pk):
    if request.user.user_type == "Saller":
        product = get_object_or_404(Product, id=pk)
        product.delete()
        messages.success(request, "your product delete successfully!")
        return redirect("app_shop:sallerproductlist")
    else:
        return redirect("app_shop:home")

