
var btns = document.getElementsByClassName("tabs")[0].getElementsByTagName("div");
for (var i = 0; i < btns.length; i++) {
    btns[i].onclick = function () {
        for (var j = 0; j < btns.length; j++) {
            btns[j].className = "";
        }
        this.className = "select";
    }
}

//播放列表滚动
new CraetObject("wrapper");




//猜你喜欢和热门推荐
var content = document.getElementsByClassName("guess")[0].getElementsByClassName("content")[0];
var content1 = document.getElementsByClassName("recommend")[0].getElementsByClassName("content")[0];
ajax(content, "GET", "./data/like.json", false, "", movies);
ajax(content1, "GET", "./data/hot.json", false, "", movies);

//ajax获取电影榜
var films_list = document.getElementsByClassName("films_list")[0];
ajax(films_list, "GET", "./data/ranking.json", false, "", filmsList);



//发表评论
var oList = document.getElementsByClassName("list_right")[0];
var content2 = oList.getElementsByClassName("content")[0];
var oF = oList.getElementsByTagName("form")[0];
var oPost = oList.getElementsByClassName("submit")[0];
var oText = oList.getElementsByTagName("textarea")[0];
var oNum = oList.getElementsByClassName("num")[0];
oPost.onclick = function () {
    var str1 = content2.innerHTML;
    var str2 = '<ul><li class="clearfix"><div><img src="./img/100_60_60.jpg"/></div><div><span>小马</span><span>' + new Date().toLocaleDateString() + '</span></div></li><li>' + oF.text.value + '</li><li><span><i></i><i>' + 999 + '</i></span></li></ul>';
    content2.innerHTML = str2 + str1;
    oF.text.value = "";
}
oText.oninput = function () {
    var num = 140 - this.value.length;
    oNum.innerHTML = num;
}

//评论列表
var content2 = oList.getElementsByClassName("content")[0];
ajax(content2, "GET", "./data/discuss.json", false, "hot", discuss);

//评论排序切换
var btns1 = document.getElementsByClassName("btns")[0].getElementsByTagName("li");

for (var i = 0; i < btns1.length; i++) {
    btns1[i].index = i;
    btns1[i].onclick = function () {
        for (var j = 0; j < btns1.length; j++) {
            btns1[j].className = "";
        }
        this.className = "active";
        if (this.index == 0) {
            ajax(content2, "GET", "./data/discuss.json", false, "hot", discuss);
        } else {
            ajax(content2, "GET", "./data/discuss.json", false, "time", discuss);
        }
    }
}




