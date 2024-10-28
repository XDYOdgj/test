//处理购物车
getCartCount();
// 获取购物车数量
function getCartCount() {

    var cart = localStorage.getItem('cart')? cart = JSON.parse(localStorage.getItem('cart')) : cart = [];

    var html = '';

    if (cart == null) {
        html = '<div class="empty-cart">Your cart is empty</div>';
    }else{
        var total = 0;
        for (var i = 0; i < cart.length; i++) {
            var item = cart[i];

            total += item.goods_num * item.goods_price;
            html += '<li class="lynessa-mini-cart-item mini_cart_item">\n' +
                '<a href="/details/'+item.goods_num+'.html" class="remove remove_from_cart_button">×</a>\n' +
                '<a href="/details/'+item.linkTitle+'.html">\n' +
                '<img src="static/picture/apro134-1-600x778.jpg" class="attachment-lynessa_thumbnail size-lynessa_thumbnail" alt="img" width="600" height="778">'+item.goods_name+'</a>' +
                '<span class="quantity">'+item.goods_num+' × <span class="lynessa-Price-amount amount"><span class="lynessa-Price-currencySymbol">$</span>'+item.goods_price+'</span></span>\n' +
                '</li>';

        }
    }

}
