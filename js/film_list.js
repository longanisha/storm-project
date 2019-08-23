window.onload = function(){
    function appendFilm(ul, film) {
        var tmp = document.createElement("div");
        tmp.innerHTML = `<li>
        <div class="movie_details">
            <span class="special"></span>
            <span class="blur">${film.txt}</span>
            <img src="${film.url}" alt="">
            <div class="movie_text">
                <div>
                    <p>${film.title}</p>
                    <p>${film.message}</p>
                </div>
                <p class="ranking_point">
                    <span>${film.grade1}</span><span>${film.grade2}</span>
                </p>
            </div>
        </div>
    </li>`;
    
        var parent = document.querySelector(ul);
        parent.appendChild(tmp.firstChild);
      }
      ajax("GET", "data/films.json", undefined, data => {
        // console.log(data);
        var films = data.films;
        films.forEach(film => {
          appendFilm("div#mainFilms ul", film);
        });
        films.forEach(film => {
            appendFilm("div#mainFilms ul", film);
          });
      });

}