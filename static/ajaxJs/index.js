// 获取id

var selectcolor = '';
var selectsize = '';

$.ajax({
    url: 'http://57.128.188.13/api/goods/trendList',
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        renderData(data.data);
    }
});


function renderData(data) {

    let html = '';

    let shopData = data;

    for (let i = 0; i < shopData.length; i++) {
        let item = shopData[i];

        html += `<div class="product-item best-selling style-04 rows-space-30 col-bg-3 col-xl-3 col-lg-4 col-md-4 col-sm-6 col-ts-6 post-25 product type-product status-publish has-post-thumbnail product_cat-light product_cat-chair product_cat-specials product_tag-light product_tag-sock first instock sale featured shipping-taxable purchasable product-type-simple">
                        <div class="product-inner tooltip-top tooltip-all-top">

                            <div class="product-thumb">
                                <a class="thumb-link" href="/single-product.html?id=${item.pid}&title=${item.name}">
                                    <img class="img-responsive images" src="${item.image}" alt="${item.name}" width="270" height="350">
                                </a>
                                <div class="flash">
                                    <span class="onsale"><span class="number">-30%</span></span>
                                    <span class="onnew"><span class="text">New</span></span>
                                </div>
                                <div class="group-button">
                                    <div class="add-to-cart">
                                        <a href="#" class="button product_type_simple add_to_cart_button ajax_add_to_cart">Add to
                                            cart</a>
                                    </div>
                                    <a href="#" class="button yith-wcqv-button">Quick View</a>
                                    <div class="lynessa product compare-button">
                                        <a href="#" class="compare button">Compare</a>
                                    </div>
                                    <div class="yith-wcwl-add-to-wishlist">
                                        <div class="yith-wcwl-add-button show">
                                            <a href="#" class="add_to_wishlist">Add to Wishlist</a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="product-info">
                                <h3 class="product-name product_title">
                                    <a class="two-lines" href="/single-product.html?id=${item.pid}&title=${item.name}">${item.name}</a>
                                </h3>
                                <span class="price"><del><span class="lynessa-Price-amount amount"><span class="lynessa-Price-currencySymbol">$</span>${item.price}</span></del> <ins><span class="lynessa-Price-amount amount"><span class="lynessa-Price-currencySymbol">$</span>${item.selling_price}</span></ins></span>
                            </div>
                        </div>
                    </div>`;

    }

    $('#product-list').html(html);
}
