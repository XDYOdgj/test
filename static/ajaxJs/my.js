// 判断是否登录
isLogin();
var user = '';

function isLogin() {

    // 获取用户缓存信息
    user = localStorage.getItem("userInfo");

    if (!user){
        // 跳转登录
        window.location.href = "my-account.html";
    }else{
        user = JSON.parse(user);
    }


// 判断页面 是否是
    var url = window.location.href;
// 判断是否是dashboard.html

    if (url.indexOf("dashboard.html") > -1) {
        //处理dashboard页面
        $(".nickname").text(user.nickname);
    }

}

