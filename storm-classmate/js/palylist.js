//电影列表(playlist)
var content = document.getElementById("main").getElementsByClassName("content")[0];
ajax(content, "GET", "./data/playlist.json", false, "time",movies);

//点击切换排序
var oSort = document.getElementsByClassName("sort")[0];
var oLi = oSort.getElementsByTagName("li");
for(var i = 0; i < oLi.length; i++){
    oLi[i].index = i;
    oLi[i].onclick = function(){
        for(var j = 0; j < oLi.length; j++){
            oLi[j].className = "";
        }
        this.className = "select";
        if(this.index == 0){
            ajax(content, "GET", "./data/playlist.json", false, "time",movies);
            console.log(this.index);
        }else{
            ajax(content, "GET", "./data/playlist.json", false, "grade",movies);
            console.log(this.index);
        }
    }
} 