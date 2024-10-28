// 获取id
var id = $('#goods_id').val();

var selectcolor = '';
var selectsize = '';

$.ajax({
    url: 'http://57.128.188.13/api/goods/detail/id/'+id,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        renderData(data.data);
    }
});

function renderData(data) {
    $('#title').html(data.name);
    document.title = data.name;
    var price = '$';
    $('.price').html(price + data.selling_price);
    $('#description').html(data.description);


    var html1 = ' <option data-type="" data-pa_color="" value="">Choose an option</option>';
    var html2 = ' <option data-type="" data-pa_color="" value="">Choose an option</option>';

    data.colour.forEach(function (color) {
        html1 += '<option data-width="30" data-height="40" data-type="color" data-pa_color="'+color+'" value="'+color+'" class="attached enabled">'+color+'</option>';
    });

    data.size.forEach(function (size) {
        html2 += '<option data-width="30" data-height="40" data-type="size" data-pa_color="'+size+'" value="'+size+'" class="attached enabled">'+size+'</option>';
    });

    $('#color').html(html1);
    $('#size').html(html2);

    //图片
    var html3 = '';
    data.image.forEach(function (image) {
        html3 += '<div class="lynessa-product-gallery__image" >\n' +
            '                                                <img  alt="img" src="'+image+'">\n' +
            '                                            </div>';
    });

    $('.lynessa-product-gallery__wrapper').html(html3);

    var html4 = '';
    data.thumbnail_image.forEach(function (image) {
        html4 += '<li style="height: 150px;"><img src="'+image+'" alt="img"></li>';
    });

    $('.flex-control-thumbs').html(html4);

    $('.maskBox').hide();

    $('#tab-description').html(data.long_description);
}


function renderSpecificationData(data) {
    var price = '$';
    $('.price').html(price + data.selling_price);
    $('#description').html(data.short_description);

    $('.maskBox').hide();
}


//获取id = color 和 size选中的值
function getSelectedValue() {
    var color = $('#color option:selected').attr('data-pa_color');

    var size = $('#size option:selected').attr('data-pa_color');

    if (color != '' && size != '') {
        if (selectcolor != color || selectsize != size){
            getPrice(size, color);
        }
    }

}

// 获取商品规格价格
function getPrice(size, color) {

    selectcolor = color;
    selectsize = size;

    $('.maskBox').show();
    $.ajax({
        url: 'http://57.128.188.13/api/goods_specification/getGoodsSpecificationPrice',
        type: 'post',
        dataType: 'json',
        data: {
            size: size,
            color: color,
            goods_id: id
        },
        success: function (data) {
            renderSpecificationData(data.data);
        }
    });

}

// 登录
$('#shopping_trolley').on('submit', function(e) {

    var quantity = $('#quantity').val();

    if (quantity == '' || isNaN(quantity) || quantity < 1) {

        $.toast({
            heading: 'Error',
            text: 'Please input quantity',
            showHideTransition: 'fade',
            icon:'error',
            position: 'top-right',
            hideAfter: 3000,
            stack: 6
        });

        return false;
    }

    //添加至购物车到缓存
    var cart = localStorage.getItem('cart');

    if (cart != null) {
        alert(1234);
        cart = JSON.parse(cart);
    }

    var goods_id = id;
    var goods_name = $('#title').html();
    var goods_price = $('.price').html().slice(1);
    var goods_num = quantity;
    var goods_color = selectcolor;
    var goods_size = selectsize;
    var goods_img = $('.lynessa-product-gallery__image img').attr('src');
    var goods_handleTitle = $('#goods_handleTitle').val();

    var goods = {
        goods_id: goods_id,
        goods_name: goods_name,
        goods_price: goods_price,
        goods_num: goods_num,
        goods_img: goods_img,
        goods_handleTitle: goods_handleTitle
    };

    if (goods_color != '' && goods_size != '') {
        goods.goods_color = goods_color;
        goods.goods_size = goods_size;
    }else{
        $.toast({
            heading: 'Error',
            text: 'Please select specifications',
            showHideTransition: 'fade',
            icon:'error',
            position: 'top-right',
            hideAfter: 3000,
            stack: 6
        });

        return false;
    }

    if (cart == null) {
        cart = [];
        cart.push(goods);
    }else{
        cart.push(goods);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    $.toast({
        heading: 'Success',
        text: 'Add to cart success',
        showHideTransition: 'fade',
        icon:'success',
        position: 'top-right',
        hideAfter: 3000,
        stack: 6
    });

    return false;
});
