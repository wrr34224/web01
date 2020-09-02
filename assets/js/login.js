$(function () {
    $("#link_reg").on("click", function () {
        $(".login-box").hide()
        $(".reg-box").show()
    })
    $("#link_login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })
    //从layui 中获取 form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        //自定义pwd的规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码是否一致的规则
        repwd: function (value) {
            //通过形参拿到的确认密码中的内容
            //还需要拿到密码框中的内容
            //然后进行一次等于判断
            //如果判断失败，则return一个消息
            var pwd = $(".reg-box [name=password]").val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }

    })
    //监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/reguser',
            data: {
                username: $('#form_reg [name=username]').val(),
                password: $('#form_reg  [name=password]').val()

            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                console.log("注册成功！")
                $("#link_login").click()
            }
        })
    })
    //监听登录表单的提交事件
    $("#form_login").submit(function(e){
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: '/api/login',
            //快速获取表单中的数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message)
                // console.log(res.token)
                localStorage.setItem('koken',res.token)
                location.href = '/index.html'
            }
        })
    })
})

