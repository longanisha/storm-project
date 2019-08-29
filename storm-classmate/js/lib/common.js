//缓速运动（多个运动）
function hs(el, obj) {
    if (el.timer) {
        clearInterval(el.timer);
    }
    for (var key in obj) {
        if (key == "opacity") {
            obj[key] = obj[key] * 100;
        }
    }
    el.timer = setInterval(function () {
        for (var k in obj) {
            if (k == "opacity") {
                var cur = parseInt(getStyle(el, k) * 100);
            } else {
                var cur = parseInt(getStyle(el, k));
            }
            if (cur < obj[k]) {
                var speed = Math.ceil((obj[k] - cur) / 10);
            } else {
                var speed = Math.floor((obj[k] - cur) / 10);
            }
            var n = cur + speed;
            if (n == obj[k]) {
                n = obj[k];
                clearInterval(el.timer);
            }
            if (k == "opacity") {
                el.style[k] = n / 100;
            } else {
                el.style[k] = n + "px";
            }
        }

    }, 30)

}

// 获取非行间样式
function getStyle(el, attr) {
    if (el.currentStyle) {
        return el.currentStyle[attr];
    } else {
        return getComputedStyle(el)[attr];
    }
}

//ajax请求数据
function ajax(obj, method, url, flag, keyword, cb) {
    //将提交方式改为大写
    method = method.toUpperCase();

    var num = 0;

    var ajax = new XMLHttpRequest();
    //路径相对当前引入js的html页面，不是相对于js文件
    ajax.open(method, url);
    ajax.send();
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var arr = JSON.parse(ajax.responseText);
            if (cb) {
                cb(obj, arr, flag, keyword);
            }
        }
    }
}
//创建电影展示列表
/* 
    obj:盛放电影的元素
    arr:ajax请求来的数据
    flag:控制显示显示电影数量 true:只显示五条数据
        false:显示全部数据
*/
function movies(obj, arr, flag, keyword) {
    obj.innerHTML = "";
    //数组中满足条件的交换位置
    function jh(index) {
        var temp = arr.films[index];
        arr.films[index] = arr.films[index + 1];
        arr.films[index + 1] = temp;
    }
    if (keyword == "time") {
        for (var i = 0; i < arr.films.length; i++) {
            arr.films[i].timer = Date.parse(arr.films[i].timer);
        }
        for (var i = 0; i < arr.films.length; i++) {
            for (var j = 0; j < arr.films.length - i - 1; j++) {
                if (arr.films[j].timer < arr.films[j + 1].timer) {
                    jh(j);
                }
            }
        }
    } else if (keyword == "grade") {
        for (var i = 0; i < arr.films.length; i++) {
            for (var j = 0; j < arr.films.length - i - 1; j++) {
                if (arr.films[j].grade < arr.films[j + 1].grade) {
                    jh(j);
                }
            }
        }
    }
    if (arr.films.length > 5 && flag) {
        var num = 5;
    } else {
        var num = arr.films.length;
    }
    for (var i = 0; i < num; i++) {
        var oUl = document.createElement("ul");
        var oLi1 = document.createElement("li");
        var oLi2 = document.createElement("li");
        var oSpan1 = document.createElement("span");
        var oSpan2 = document.createElement("span");
        var oSpan3 = document.createElement("span");
        var oSpan4 = document.createElement("span");
        var oSpan5 = document.createElement("span");
        var oImg = document.createElement("img");
        obj.appendChild(oUl);
        oUl.appendChild(oLi1);
        oUl.appendChild(oLi2);
        oLi1.appendChild(oImg);
        oLi1.appendChild(oSpan1);
        oLi1.appendChild(oSpan2);
        oLi2.appendChild(oSpan3);
        oLi2.appendChild(oSpan4);
        oLi2.appendChild(oSpan5);
        for (var key in arr.films[i]) {
            if (key == "url") {
                oImg.src = arr.films[i][key];
            }
            if (key == "txt") {
                if (arr.films[i][key] == "标清" || arr.films[i][key] == "高清") {
                    oSpan1.innerHTML = "VIP专享";
                    oSpan1.style.backgroundColor = "#45b601";
                } else if (arr.films[i][key] == "超清") {
                    oSpan1.innerHTML = "&nbsp;<i>5元</i>&nbsp;VIP免费";
                    oSpan1.style.backgroundColor = "#ff8406";
                }
                oSpan2.style.background = "rgba(0,0,0,0.5)";
                oSpan2.innerHTML = arr.films[i][key];
            }
            if (key == "title") {
                oSpan3.innerHTML = arr.films[i][key];
            }
            if (key == "message") {
                oSpan4.innerHTML = arr.films[i][key];
            }
            if (key == "grade") {
                var array = String(arr.films[i][key]).split(".");
                if (parseInt(arr.films[i][key]) == arr.films[i][key]) {
                    oSpan5.innerHTML = "<i>" + array[0] + "</i>" + "." + 0;
                } else {
                    oSpan5.innerHTML = "<i>" + array[0] + "</i>" + "." + array[1];
                }


            }
        }
    }
}

//电影榜列表渲染
function filmsList(obj, arr, flag, keyword) {
    // obj.innerHTML = "";
    var str = "";
    for (var i = 0; i < arr.films.length; i++) {
        str += '<div><i>' + (i + 1) + '</i><span>' + arr.films[i].title + '</span><b>' + arr.films[i].grade + '</b><div><img src="' + arr.films[i].src + '"/><span><i>' + (i + 1) + '</i><span>' + arr.films[i].title + '</span></span></div></div>'
    }
    obj.innerHTML = str;
}

//评论列表渲染
function discuss(obj, arr, flag, keyword) {
    if(keyword == "hot"){
        for(var i = 0; i < arr.length; i++){
            for(var j = i; j < arr.length - 1; j++){
                if(arr[j].praise < arr[j+1].praise){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }else if(keyword == "time"){
        for(var i = 0; i < arr.length; i++){
            for(var j = i; j < arr.length - 1; j++){
                if(arr[j].time < arr[j+1].time){
                    var temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
    }
    var str = "";
    for (var i = 0; i < arr.length; i++) {
        var str1 = new Date(arr[i].time).toLocaleDateString().replace(/\//g,"-");
        str += '<ul><li class="clearfix"><div><img src="' + arr[i].url + '"/></div><div><span>' + arr[i].userName + '</span><span>' +str1+ '</span></div></li><li>' + arr[i].message + '</li><li><span><i></i><i>' + arr[i].praise + '</i></span></li></ul>';
    }
    obj.innerHTML = str;
}


//滚动轴封装对象
function CraetObject(id) {
    // getElementById时document方法，必须要加document前缀
    // 获取传入构造函数（类）的参数id
    var oCon = document.getElementById(id);
    // 将共有属性添加到构造函数创建的对象中
    this.oBox = document.getElementsByClassName("container")[0];
    this.oP = oCon.getElementsByTagName("ul")[0];
    this.oCtl1 = document.getElementsByClassName("ctrl")[0];
    this.oCtl = oCon.getElementsByTagName("span")[0];
    // 文字滚动的距离的比例参数
    this.rate = (this.oP.offsetHeight - this.oBox.offsetHeight) / (this.oCtl1.offsetHeight - this.oCtl.offsetHeight);
    // 定义变量保存当前this指向（指向对象，也就是这个类创建的实例对象）
    var _this = this;
    this.oCtl.onmousedown = function () {
        // console.log(this.offsetTop);
        _this.downFn();
    }
    document.onmouseup = function () {
        _this.upFn();
    }
    this.oBox.onscroll = function(){
        _this.scrollFn();
    }
}
CraetObject.prototype.downFn = function (ev) {
    //this指向调用函数的对象，也就是CraetObject的实例对象
    var ev = window.event || ev;
    this.t1 = this.oCtl.offsetTop;
    //鼠标点击时的相对于窗口的垂直坐标
    this.y1 = ev.clientY;
    //定义变量保存this指向（始终保持指向实例对象）
    var _this = this;
    document.onmousemove = function () {
        //这里this指向触发事件的元素，即document，所以在这里如果要用原型里的方法的话，要用实例来获取，即用_this（指向实例）来获取，而不用默认的this（因为这里的this不指向实例）
        _this.downMove();
    }

}
CraetObject.prototype.downMove = function (ev) {
    var ev = window.event || ev;
    this.y2 = ev.clientY;
    this.t = this.t1 + (this.y2 - this.y1);
    if (this.t < 0) {
        this.t = 0;
    } else if (this.t > this.oCtl1.offsetHeight - this.oCtl.offsetHeight) {
        this.t = this.oCtl1.offsetHeight - this.oCtl.offsetHeight;
    }
    this.oCtl.style.top = this.t + "px";
    this.oBox.scrollTop = this.t * this.rate;
}
CraetObject.prototype.upFn = function () {
    document.onmousemove = null;
}
CraetObject.prototype.scrollFn = function (){
    this.oCtl.style.top = this.oBox.scrollTop/this.rate + "px";
}
/* 随机生成验证码 */
function showCode(obj) {
    var str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var str1 = "";
    for (var i = 0; i < 4; i++) {
        var index = parseInt(Math.random()*(str.length));
        // console.log(index);
        str1 += str[index];
        obj.innerHTML = str1;
    }
}

