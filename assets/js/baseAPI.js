//注意： 每次调用$.get() $.post() 或$.ajax的时候
//会先调用$.ajaxPrefilter() options请求参数对象
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})