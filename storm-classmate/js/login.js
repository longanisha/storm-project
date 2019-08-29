/* 表单验证 */
var box1 = document.getElementsByClassName("text")[0];
var box2 = document.getElementsByClassName("psd")[0];
var oUser = document.getElementById("user");
var oPsd = document.getElementById("psd");
var oMessages = document.getElementsByClassName("message");
var oF = document.getElementsByTagName("form")[0];

/* 登录名格式验证 */
oUser.onblur = function () {
    var str = this.value;
    /* 手机号|邮箱|用户名格式验证 */
    var reg = /(^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$)|(^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$)/;
    if (!reg.test(str)) {
        box1.innerHTML = "输入错误！";
    } else {
        box1.innerHTML = "";
    }

}
/* 登录密码格式验证 */
oPsd.onblur = function () {
    var str = this.value;
    /* 以字母开头，长度在6~18之间，只能包含字母、数字和下划线 */
    var reg = /^[a-zA-Z]\w{5,17}$/;
    if (!reg.test(str)) {
        box2.innerHTML = "输入错误！";
    } else {
        box2.innerHTML = "";
    }
}

oF.onsubmit = function () {
    var flag = true;
    for (var i = 0; i < oMessages.length; i++) {
        if (oMessages[i].innerHTML == "输入错误！") {
            flag = false;
        }
    }
    if (!flag) {
        return false;
    }
}

/* 点击勾选记住图标 */
var remember = document.getElementsByClassName("select")[0];
var flag = true;
remember.onclick = function () {
    if (flag) {
        this.style.background = 'url("./img/disclick.png") no-repeat 0 0';
    } else {
        this.style.background = 'url("./img/click.png") no-repeat 0 0';
    }
    flag = !flag;
}