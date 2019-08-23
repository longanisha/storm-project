window.onload = function(){
    var swiper = document.getElementById("swiper");
    var mainPic = swiper.getElementsByTagName("img")[0];  
    var smallPic = document.getElementById("smallPic").getElementsByTagName("li");
    var btns = swiper.getElementsByTagName("span");

    var n = 0;
    var timer = setInterval(autoPlay,1000);
    swiper.onmouseover = function(){
        clearInterval(timer);
    }
    swiper.onmouseout = function(){
        timer = setInterval(autoPlay,1000);
    } 
    for(var i=0;i<smallPic.length;i++){
        smallPic[i].index = i;
        smallPic[i].onclick = function(){
          
            n = this.index;
            n--;
            autoPlay();
        }
        
    }
    function autoPlay(){
        n++;
        if(n==9){
            n=0;
        }else if(n==-1){
            n=9;
        }
        for(var j=0;j<smallPic.length;j++){
            smallPic[j].className = "";
        }
        smallPic[n].className = "active";
        mainPic.src = "./img/banner_"+(n+1)+".jpg";
    }

    var vip = document.getElementById("vip");
    var vipBtns = vip.getElementsByTagName("span");
    var vipList = vip.getElementsByTagName("ul")[0];
    console.log(vipList);
    vipBtns[1].onclick = function(){
        vipList.style.left = "0px";
    }
    vipBtns[2].onclick = function(){
            vipList.style.left = "-1060px";
    }
}



