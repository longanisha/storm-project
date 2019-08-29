// 初始化验证码
var oShow = document.getElementsByClassName("show")[0];
showCode(oShow);

/* 刷新验证码 */
var oChange = document.getElementsByClassName("change")[0];
oChange.onclick = function(){
    showCode(oShow);
}

/* 表单验证 */
var box1 = document.getElementsByClassName("text")[0];
var box2 = document.getElementsByClassName("psd")[0];
var box3 = document.getElementsByClassName("code")[0];
var box4 = document.getElementsByClassName("phone")[0];
var oUser = document.getElementById("user");
var oPsd = document.getElementById("psd");
var oCode = document.getElementById("code");
var oPhone = document.getElementById("phone");
var oMessages = document.getElementsByClassName("message");
var oF = document.getElementsByTagName("form")[0];

/* 注册格式验证 */
oUser.onblur = function(){
    var str = this.value;
    /* 手机号格式验证 */
    var reg = /(^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$)/;
    if(!reg.test(str)){
        box1.innerHTML = "输入错误！";
    }else{
        box1.innerHTML = "";
    }

}
/* 注册密码格式验证 */
oPsd.onblur = function(){
    var str = this.value;
    /* 5-10位数字字母组合 */
    var reg = /^[0-9]+[a-z]+[a-z0-9]*$|^[a-z]+[0-9]+[a-z0-9]*$/i; 
    if(str.length >= 5 && str.length <= 10){
        if(!reg.test(str)){
            box2.innerHTML = "输入错误！";
        }else{
            box2.innerHTML = "";
        }
    }else{
        box2.innerHTML = "输入错误！";
    }
}

/* 验证码格式验证(不区分大小写) */
oCode.onblur = function(){
    var str = this.value.toUpperCase();
    var str1 = oShow.innerHTML.toUpperCase(); 
    if(str != str1){
        box3.innerHTML = "输入错误！";
    }else{
        box3.innerHTML = "";
    }
        
}
/* 手机验证码格式验证*/

oF.onsubmit = function () {
    var flag = true;
    for(var i = 0; i < oMessages.length; i++){
        if(oMessages[i].innerHTML == "输入错误！"){
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