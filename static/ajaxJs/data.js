var page = 1;

var pageSize = 12;

var count = 0;

getPageData();

function getPageData() {

    /*$('.loading').show();*/

    $.ajax({
        url: 'http://57.128.188.13/api/goods/list',
        type: 'GET',
        dataType: 'json',
        data: {
            page: page,
            limit: pageSize
        },
        success: function (data) {

            if (data.data.data.length == 0) {
                alert('没有更多数据了');
                return;
            }

            renderData(data.data);
        }
    });
}

// 分页渲染数据
function renderData(data) {

    let html = '';

    let shopData = data.data;

    count = data.page;

    for (let i = 0; i < shopData.length; i++) {
        let item = shopData[i];

        html += `
                <li class="product-item wow fadeInUp product-item rows-space-30 col-bg-3 col-xl-3 col-lg-4 col-md-6 col-sm-6 col-ts-6 style-01 post-24 product type-product status-publish has-post-thumbnail product_cat-chair product_cat-table product_cat-new-arrivals product_tag-light product_tag-hat product_tag-sock first instock featured shipping-taxable purchasable product-type-variable has-default-attributes" data-wow-duration="1s" data-wow-delay="0ms" data-wow="fadeInUp">
                    <div class="product-inner">
                        <div class="product-thumb">
                            <a data-id="${item.pid}" href="/single-product.html?id=${item.pid}&title=${item.name}" class="thumb-link">
                                <img class="images" src="${item.image}" alt="${item.name}">
                            </a>
                        </div>
                        <div class="product-info equal-elem">
                                    <h3 class="product-name two-lines">
                                        <a href="/single-product.html?id=${item.pid}&title=${item.name}">${item.name}</a>
                                    </h3>
                                    <div class="rating-wapper nostar">
                                        <span class="price">${item.price}</span>
                                        <div class="lynessa-product-details__short-description">
                                           ${item.description}
                                        </div>
                                    </div>
                                    <div class="group-button">
                                        <div class="group-button-inner">
                                            <a href="/single-product.html?id=${item.pid}&title=${item.name}" class="button product_type_variable add_to_cart_button">Select
                                                options</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
            `;
    }

    $('#product-list').html(html);

    $('.lynessa-result-count').html('Showing 12 of '+data.count+' results');

    //隐藏loading
    $('.loading').hide();
}

// 点击分页按钮渲染数据

function renderPage(paging , pageInput = ''){

    let html = '';

    if (pageInput != ''){
        page = pageInput;
        getPageData();
    }else{
        if (paging){
            if (page >= count){
                alert('已经是最后一页了');
                return;
            }
            page = page + 1;
            getPageData();
        }else{

            if (page == 1){
                alert('已经是第一页了');
                return;
            }
            page = page - 1;
            getPageData();
        }
    }


    // 设置页码
    $('.pageinput').val(page);

    //跳转到头部
    $('body,html').animate({scrollTop:400},0);

    $('#product-list').html(html);
}

document.getElementById('pageinput').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        renderPage(true, parseInt(event.target.value));
    }
});
