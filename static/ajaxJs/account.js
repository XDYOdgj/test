$('#register').on('submit', function(e) {
var formData = $(this).serialize();

    $.ajax({
        url: 'http://57.128.188.13/api/account/register',
        type: 'post',
        dataType: 'json',
        data: formData,
        success: function (data) {

            if (data.code != 1){
                // 错误提示
                alert(data.msg);
            }else{

                // 缓存token
                localStorage.setItem('token', data.data.token);

                // 缓存用户信息
                localStorage.setItem('userInfo', JSON.stringify(data.data.userInfo));

                // 跳转 上一页
                window.history.go(-1);
            }

        }
    });
    return false;
});


// 登录
$('#login').on('submit', function(e) {
    var formData = $(this).serialize();

    $.ajax({
        url: 'http://57.128.188.13/api/account/login',
        type: 'post',
        dataType: 'json',
        data: formData,
        success: function (data) {

            if (data.code != 1){
                // 错误提示
                alert(data.msg);
            }else{

                // 缓存token
                localStorage.setItem('token', data.data.token);

                // 缓存用户信息
                localStorage.setItem('userInfo', JSON.stringify(data.data.userInfo));

                // 跳转 上一页
                window.history.go(-1);
            }

        }
    });

    return false;
});
