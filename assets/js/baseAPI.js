//注意： 每次调用$.get() $.post() 或$.ajax的时候
//会先调用$.ajaxPrefilter() options请求参数对象
$.ajaxPrefilter(function (options) {
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    //统一为有权限的接口设置headers头部
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    //群居统一
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            //清空本地存储中的token
            localStorage.removeItem('token')
            //重新跳转到登录页面
            location.href = '/login.html'
        }

    }
})