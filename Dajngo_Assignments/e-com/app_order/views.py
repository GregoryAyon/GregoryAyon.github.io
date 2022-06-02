from ast import Or
from django.shortcuts import render, get_object_or_404, redirect

# Authentications
from django.contrib.auth.decorators import login_required

# Model
from app_order.models import Cart, Order
from app_shop.models import *
# Messages
from django.contrib import messages
# datetime
from django.utils import timezone
# Create your views here.

@login_required
def add_to_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    print("Item")
    print(item)
    order_item = Cart.objects.get_or_create(item=item, user=request.user, purchased=False)
    print("Order Item Object:")
    print(order_item)
    print(order_item[0])
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    print("Order Qs:")
    print(order_qs)
    #print(order_qs[0])
    if order_qs.exists():
        order = order_qs[0]
        print("If Order exist")
        print(order)
        if order.orderitems.filter(item=item).exists():
            order_item[0].quantity += 1
            order_item[0].save()
            messages.info(request, "This item quantity was updated.")
            return redirect("app_shop:home")
        else:
            order.orderitems.add(order_item[0])
            messages.info(request, "This item was added to your cart.")
            return redirect("app_shop:home")
    else:
        order = Order(user=request.user)
        order.save()
        order.orderitems.add(order_item[0])
        messages.info(request, "This item was added to your cart.")
        return redirect("app_shop:home")


@login_required
def cart_view(request):
    carts = Cart.objects.filter(user=request.user, purchased=False)
    orders = Order.objects.filter(user=request.user, ordered=False)
    if carts.exists() and orders.exists():
        order = orders[0]
        return render(request, 'app_order/cart.html', context={'carts':carts, 'order':order})
    else:
        messages.warning(request, "You don't have any item in your cart!")
        return redirect("app_shop:home")


@login_required
def remove_from_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.orderitems.filter(item=item).exists():
            order_item = Cart.objects.filter(item=item, user=request.user, purchased=False)[0]
            order.orderitems.remove(order_item)
            order_item.delete()
            messages.warning(request, "This item was removed form your cart")
            return redirect("app_order:cart")
        else:
            messages.info(request, "This item was not in your cart.")
            return redirect("app_shop:home")
    else:
        messages.info(request, "You don't have an active order")
        return redirect("app_shop:home")

@login_required
def increase_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.orderitems.filter(item=item).exists():
            order_item = Cart.objects.filter(item=item, user=request.user, purchased=False)[0]
            if order_item.quantity >= 1:
                order_item.quantity += 1
                order_item.save()
                messages.info(request, f"{item.name} quantity has been updated")
                return redirect("app_order:cart")
        else:
            messages.info(request, f"{item.name} is not in your cart")
            return redirect("app_shop:home")
    else:
        messages.info(request, "You don't have an active order")
        return redirect("app_shop:home")


@login_required
def decrease_cart(request, pk):
    item = get_object_or_404(Product, pk=pk)
    order_qs = Order.objects.filter(user=request.user, ordered=False)
    if order_qs.exists():
        order = order_qs[0]
        if order.orderitems.filter(item=item).exists():
            order_item = Cart.objects.filter(item=item, user=request.user, purchased=False)[0]
            if order_item.quantity > 1:
                order_item.quantity -= 1
                order_item.save()
                messages.info(request, f"{item.name} quantity has been updated")
                return redirect("app_order:cart")
            else:
                order.orderitems.remove(order_item)
                order_item.delete()
                messages.warning(request, f"{item.name} item has been removed from your cart")
                return redirect("app_order:cart")
        else:
            messages.info(request, f"{item.name} is not in your cart")
            return redirect("app_shop:home")
    else:
        messages.info(request, "You don't have an active order")
        return redirect("app_shop:home")

@login_required
def apply_coupon_view(request, order_id):
    now = timezone.now()

    if request.method == 'POST':
        coupon_code = request.POST.get('code', None)
        coupon = Coupon.objects.filter(code=coupon_code)
        order = Order.objects.filter(id= order_id)

        if coupon.exists() and order.exists():
            coupn_end_date= coupon[0].valid_to
            if coupn_end_date > now:
                order[0].apply_coupon(coupon[0])
            else:
                messages.error(request, "your coupon is expired!")
        else:
            messages.warning(request, "You entered wrong coupon code! Please enter curract coupon.")

        return redirect("app_order:cart")

        
@login_required
def remove_coupon_view(request, order_id):
    order = Order.objects.filter(id= order_id)
    # print(order)
    if order.exists():
        order[0].remove_coupon()
    else:
        messages.warning(request, "You didn't have any coupon!")

    return redirect("app_order:cart")
