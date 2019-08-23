window.onload = function(){
    function appendFilm(ul, film) {
        var tmp = document.createElement("div");
        tmp.innerHTML = `<li>
        <div class="movie_details">
            <img src="${film.src}">
            <div class="movie_text">
                <div>
                    <p>${film.title}</p>
                    <p>${film.message}</p>
                </div>
                <p class="ranking_point">${film.grade}</p>
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
          appendFilm("div.movieClasify ul", film);
        });
        films.forEach(film => {
            appendFilm("div.movieClasify ul", film);
          });
      });

}