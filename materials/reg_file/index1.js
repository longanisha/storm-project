var form = document.getElementById("form"),
    input = form.getElementsByTagName("input"),
    span = form.getElementsByTagName("span");

// 表单事件   失去焦点+改变value
form.account.onchange = function () {
    // span出现
    span[0].style.display = "inline";
    // 获取  name名为account的value
    var val1 = this.value;
    // 用户名以字母开头，必须字母和数字的组合
    var reg1 = /^[a-z][a-z0-9]*[0-9]+[a-z0-9]*$/i;

    if (reg1.test(val1)) {
        span[0].className = "success";
        span[0].innerText = "正确";
    } else {
        span[0].className = "error";
        span[0].innerText = "错误";
    }
}

form.pass.onchange = function () {
    span[1].style.display = "inline";
    var val2 = this.value;
    // 必须字母和数字的组合
    var reg2 = /(^[0-9]+[a-z]+[a-z0-9]*$)|(^[a-z]+[0-9]+[a-z0-9]*$)/i;


    // var reg2 =/^(?![0-9]+$)(?![a-z]+$)[0-9a-z]{5,10}$/i;
    // 判断长度5--10
    if (val2.length >= 5 && val2.length <= 10) {
        if (reg2.test(val2)) {
            span[1].className = "success";
            span[1].innerText = "正确";
        } else {
            span[1].className = "error";
            span[1].innerText = "错误";
        }
    } else {
        span[1].className = "error";
        span[1].innerText = "错误";
    }

}

form.num.onchange = function () {
    span[2].style.display = "inline";
    var val3 = this.value;

    var reg3 = /^[1]\d{10,10}$/i;

    if (reg3.test(val3)) {
        span[2].className = "success";
        span[2].innerText = "正确";
    } else {
        span[2].className = "error";
        span[2].innerText = "错误";
    }
}

form.em.onchange = function () {
    span[3].style.display = "inline";
    var val4 = this.value;
// 4-13位数字或字母，@+字母数字下滑线，.要转义回自身本来意思，最后要为com|cn|net中任一个
    var reg4 = /^[a-z0-9]{4,13}@\w+\.(com|cn|net)$/;
    // _1q1q@_.com
    if (reg4.test(val4)) {
        span[3].className = "success";
        span[3].innerText = "正确";
    } else {
        span[3].className = "error";
        span[3].innerText = "错误";
    }
}

// 表单事件，提交时触发
form.onsubmit = function(){
    // 假设全部对
    var flag = true;
    for(var i=0;i<span.length;i++){
        if(span[i].className=="error"){
            flag = false;
        }
    }
    // 阻止false/允许true表单提交
    return flag;
}





// function judge(el1,el2,regi){
//     el1.style.display = "inline";
//     var val = el2.value;

//     if(regi.test(val)){
//         el1.className = "success";
//         el1.innerText = "正确";
//     }else{
//         el1.className = "error";
//         el1.innerText = "错误";
//     }
// }

