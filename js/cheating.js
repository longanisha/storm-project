window.addEventListener("load",(evt) => {
    /*
    判斷各類數據的容器元素是否存在，
    如果容器元素存在，則使用ajax動態獲取對應類型的數據並渲染；
    否則忽略處理；
    */
    console.debug("由於longanisha小姐不會寫ajax，無法獨立完成老師佈置的項目作業，因此強迫某根路過的廢柴協(zuo)助(bi)完成");
    
    /* ****************************** discuss ****************************** */
    
    // 從當前html中獲取discuss數據的容器元素
    let discussContainer = document.querySelector("div.commentList ul");
    
    // 當discuss數據的容器元素存在時，執行ajax請求獲取數據並渲染至頁面
    if(discussContainer){ 
        console.log("當前頁面存在discuss數據的容器元素，執行ajax請求data/discuss.json，並將請求到的數據渲染至對應的容器元素內");
        // 使用ajax獲取data/discuss.json數據
        ajax("GET", "data/discuss.json", undefined, data => {
            discussContainer.innerHTML = '';
            // 遍歷discuss集合
            data.forEach(element => {
                renderDiscuss(discussContainer, element);
            });
        });
    }

    /* ****************************** films ****************************** */
    // 從當前html中獲取film數據的容器元素
    let filmContainer = document.querySelector("div#recomanded ul");
    
    // 當film數據的容器元素存在時，執行ajax請求獲取數據並渲染至頁面
    if(filmContainer){ 
        console.log("當前頁面存在film數據的容器元素，執行ajax請求data/films.json，並將請求到的數據渲染至對應的容器元素內");
        // 使用ajax獲取data/films.json數據
        ajax("GET", "data/films.json", undefined, data => {
            filmContainer.innerHTML = '';
            // 遍歷film集合
            data.films.forEach(element => {
                renderFilm(filmContainer, element);
            });
        });
    }
    
    /* ****************************** hot ****************************** */
    // 從當前html中獲取hot數據的容器元素
    let hotContainer = document.querySelector("div.hotLeft ul");

    // 當hot數據的容器元素存在時，執行ajax請求獲取數據並渲染至頁面
    if(hotContainer){ 
        console.log("當前頁面存在hot數據的容器元素，執行ajax請求data/hot.json，並將請求到的數據渲染至對應的容器元素內");
        // 使用ajax獲取data/hot.json數據
        ajax("GET", "data/hot.json", undefined, data => {
            hotContainer.innerHTML = '';
            // 遍歷hot集合
            data.forEach(element => {
                renderHot(hotContainer, element);
            });
        });
    }
    
    /* ****************************** like ****************************** */
    // 從當前html中獲取like數據的容器元素
    let likeContainer = document.querySelector("div.likes ul");

    // 當like數據的容器元素存在時，執行ajax請求獲取數據並渲染至頁面
    if(likeContainer){ 
        console.log("當前頁面存在like數據的容器元素，執行ajax請求data/like.json，並將請求到的數據渲染至對應的容器元素內");
        // 使用ajax獲取data/like.json數據
        ajax("GET", "data/like.json", undefined, data => {
            likeContainer.innerHTML = '';
            // 遍歷like集合
            data.forEach(element => {
                renderLike(likeContainer, element);
            });
        });
    }
    
    /* ****************************** TODO:ranking ****************************** */
    // 從當前html中獲取ranking數據的容器元素
    let rankingContainer = document.querySelector("div.hotRanking ul");

    // 當ranking數據的容器元素存在時，執行ajax請求獲取數據並渲染至頁面
    if(rankingContainer){ 
        console.log("當前頁面存在ranking數據的容器元素，執行ajax請求data/ranking.json，並將請求到的數據渲染至對應的容器元素內");
        // 使用ajax獲取data/ranking.json數據
        ajax("GET", "data/ranking.json", undefined, data => {
            rankingContainer.innerHTML = '';
            // 遍歷ranking集合
            data.forEach((element,index) => {
                element.no = index+1;
                renderRanking(rankingContainer, element);
            });
        });
    }

    // 最新更新, 最受欢迎
    let divs = document.querySelectorAll("div");
    divs.forEach(div => {
        if(div.innerText === "最新更新" || div.innerText === "最受欢迎"){
            div.className = div.className ? div.className + " tab" : "tab";
        }
    });

    // Login
    let loginForm = document.querySelector("form#form");
    if(loginForm){
        loginForm.action = "index.html";
        loginForm.onsubmit = (event) => {
            let pass = true;
            
            let inputLoginAccount = document.querySelector("input[name=account]").value;
            let regexLoginAccount = /^(1[3|5|7|9]\d{9})|(.+@.+)|\w{6,}$/;
            if(!regexLoginAccount.test(inputLoginAccount)){
                document.querySelector("span.loginAccount").className = "loginAccount error";
                pass = false;
            } else {
                document.querySelector("span.loginAccount").className = "loginAccount error hide";
            }
            
            let inputPassword = document.querySelector("input[name=password]").value;
            let regexPassword = /^\w{6,18}$/;
            if(!regexPassword.test(inputPassword)){
                document.querySelector("span.loginPassword").className = "loginPassword error";
                pass = false;
            } else {
                document.querySelector("span.loginPassword").className = "loginPassword error hide";
            }

            return pass;
        };
    }
});

/* ****************************** Data Renderer Functions ****************************** */

// 渲染discuss數據至HTML頁面
function renderDiscuss(container, discuss, usePrepend){
    if(!container){
        console.log("容器元素不存在，無法渲染discuss對象");
        console.log(discuss);
        return;
    }

    let postDate = new Date(discuss.time);
    let tmp = document.createElement("div");
    tmp.innerHTML = `<li>
        <div>
            <span><img style="width:100%;height:100%;" src="${discuss.url}"/></span>
            <div>
                <p class="userName">${discuss.userName}</p>
                <p class="time">${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}</p>
            </div>
        </div>
        <p class="massage">${discuss.message}</p>
        <p class="likesCount"><span></span><span>${discuss.praise}</span></p>
    </li>`;

    if(usePrepend){
        container.prepend(tmp.firstChild);
    } else {
        container.appendChild(tmp.firstChild);
    }
}

// 渲染film數據至HTML頁面
function renderFilm(container, film){
    if(!container){
        console.log("容器元素不存在，無法渲染film對象");
        console.log(film);
        return;
    }

    let tmp = document.createElement("div");
    tmp.innerHTML = `<li>
        <div class="movie_details">
            <span class="special"></span>
            <span class="blur">${film.txt}</span>
            <a href="${film.http}"><img src="${film.url}" alt=""></a>
            <div class="movie_text">
                <div>
                    <p>${film.title}</p>
                    <p>${film.message}</p>
                </div>
                <p class="ranking_point">
                    <span>${film.grade1}${film.grade2}</span>
                </p>
            </div>
        </div>
    <li>`;

    container.appendChild(tmp.firstChild);
}

// 渲染hot數據至HTML頁面
function renderHot(container, hot){
    if(!container){
        console.log("容器元素不存在，無法渲染hot對象");
        console.log(hot);
        return;
    }

    let tmp = document.createElement("div");
    tmp.innerHTML = `<li>
        <div class="movie_details">
            <a href="${hot.http}"><img src="${hot.url}" alt=""></a>
            <span class="movieName">${hot.title}</span>
        </div>
    </li>`;

    container.appendChild(tmp.firstChild);
}

// 渲染like數據至HTML頁面
function renderLike(container, like){
    if(!container){
        console.log("容器元素不存在，無法渲染like對象");
        console.log(like);
        return;
    }

    let tmp = document.createElement("div");
    tmp.innerHTML = `<li>
        <div class="movie_details">
            <a href="${like.http}"><img src="${like.src}" alt=""></a>
            <div class="movie_text">
                <div>
                    <p>${like.title}</p>
                    <p>${like.message}</p>
                </div>
                <p class="ranking_point">${like.grade}</p>
            </div>
        </div>
    </li>`;

    container.appendChild(tmp.firstChild);
}

// 渲染ranking數據至HTML頁面
function renderRanking(container, ranking){
    if(!container){
        console.log("容器元素不存在，無法渲染ranking對象");
        console.log(ranking);
        return;
    }

    let tmp = document.createElement("div");
    tmp.innerHTML = `<li>
        <p>
            <span>${ranking.no}</span>
            <span>${ranking.title}</span>
            <span>${ranking.grade}</span>
        </p>
    </li>`;

    container.appendChild(tmp.firstChild);
}

document.addEventListener("click", event => {
    let element = event.target;
    
    // 發表評論
    if(element.tagName === "SPAN" && element.innerText === '发表评论'){
        console.debug("由於longanisha小姐無法獨立完成老師佈置的項目作業，因此強迫某根路過的廢柴協(zuo)助(bi)完成");
        let textbox = document.querySelector("#txtBox");
        if(textbox && textbox.value){
            renderDiscuss(document.querySelector("div.commentList ul"),{
                message: textbox.value,
                praise: 2000,
                time: 1551334186196,
                url: "img/100_60_60.jpg",
                userName: "1509_5326_6"
            }, true);
        }
    }

    // 最新更新, 最受欢迎
    if(element.tagName === "DIV" && ( element.innerText === '最新更新' || element.innerText === '最受欢迎') ){
        console.debug("由於longanisha小姐無法獨立完成老師佈置的項目作業，因此強迫某根路過的廢柴協(zuo)助(bi)完成");
        document.querySelectorAll("div.tab").forEach(tab => {
            tab.className = "tab";
        });

        element.className = "tab active";
        clearFilmList();
        loadFilmList(element.innerText === '最受欢迎' ? (a,b) => {
            let x = parseInt(a.grade1) * 10 + parseInt(a.grade2 ? a.grade2 : 0);
            let y = parseInt(b.grade1) * 10 + parseInt(b.grade2 ? b.grade2 : 0);
            return y-x;
        } : undefined);
    }
});

// 清空頁面影片列表
function clearFilmList(){
    let container = document.querySelector("ul.mainFilmContent");
    if(container){
        container.innerHTML = '';
    }
}

// 加載影片列表並排序渲染
function loadFilmList(comparasion){
    let container = document.querySelector("ul.mainFilmContent");

    ajax("GET", "data/films1.json", undefined, data => {
        let films = data.films;
        if(comparasion){
            films.sort(comparasion);
        }
        films.forEach(film => renderFilm(document.querySelector("ul.mainFilmContent"),film));
    });
}