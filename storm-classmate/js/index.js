//swiper
var oSwiper = document.getElementsByClassName("swiper")[0];
var oCon = document.getElementsByClassName("container")[0];
var oImgs = oCon.getElementsByTagName("img");
var oNext = document.getElementsByClassName("next")[0];
var oPrev = document.getElementsByClassName("prev")[0];
var oSmall = document.getElementsByClassName("btn")[0].getElementsByTagName("span");
oImgs[0].style.opacity = "1";
var index = 0;
function change(flag) {
    if (flag == true) {
        index++;
        if (index == oImgs.length) {
            index = 0;
        }
    } else {
        index--;
        if (index == -1) {
            index = oImgs.length - 1;
        }
    }
    for (var i = 0; i < oImgs.length; i++) {
        clearInterval(oImgs[i].timer);
        oImgs[i].style.opacity = "0";
        oSmall[i].className = "";
    }
    oSmall[index].className = "select";
    hs(oImgs[index], { "opacity": 1 });
}
oNext.onclick = function () {
    change(true);
}
oPrev.onclick = function () {
    change(false);
}
for (var i = 0; i < oSmall.length; i++) {
    oSmall[i].index = i;
    oSmall[i].onmouseover = function () {
        if (index != this.index) {
            //将当前this.index赋给全局index
            index = this.index;
            for (var j = 0; j < oSmall.length; j++) {
                clearInterval(oImgs[j].timer);
                oImgs[j].style.opacity = "0";
                oSmall[j].className = "";
            }
            this.className = "select";
            hs(oImgs[index], { "opacity": 1 });
        }

    }
}
var timer = null;
function play() {
    timer = setInterval(function () {
        change(true);
    }, 3000);
}
play();
oSwiper.onmouseover = function () {
    clearInterval(timer);
}
oSwiper.onmouseout = function () {
    play();
}

//scroll
var scroll_bar = document.getElementsByClassName("scroll")[0];
var scroll_prev = scroll_bar.getElementsByClassName("prev")[0];
var scroll_next = scroll_bar.getElementsByClassName("next")[0];
var scroll_span = scroll_bar.getElementsByTagName("span")[0];
scroll_prev.onclick = function () {
    hs(scroll_span, { "left": 0 });
}
scroll_next.onclick = function () {
    hs(scroll_span, { "left": -1200 });
}

//ajax
var oRmd = document.getElementsByClassName("recommendation")[0];
var oHme = document.getElementsByClassName("hot_movie")[0];
var content = oRmd.getElementsByClassName("content")[0];
var content1 = oHme.getElementsByClassName("content")[0];

ajax(content,"GET","./data/films.json",true,"",movies);
ajax(content1,"GET","./data/hotMovie.json",true,"",movies);




