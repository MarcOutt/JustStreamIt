async function fetchCheckServer(url) {
    const response = await fetch(url)
    if (response.ok === true) {
        return response.json();
    }
    throw new Error('impossible de contacter le serveur')
}

function modal(id){
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block"

    fetchCheckServer('http://localhost:8000/api/v1/titles/'+id)
        .then(function (data) {
            let modalContent = document.querySelector(".modalMovieInformations");

            let movieImage= document.createElement("p");
            modalContent.innerHTML = "<p> <img src="+ data.image_url + "></img></p>";
            modalContent.append(movieImage)

            let movieTitle = document.createElement("p");
            movieTitle.innerHTML = "<b>Titre:</b> " + data.title;
            modalContent.append(movieTitle)

            let movieGenre = document.createElement("p");
            movieGenre.innerHTML = "<b>Genre(s):</b> " + data.genres;
            modalContent.append(movieGenre)

            let movieDatePublished = document.createElement("p");
            movieDatePublished.innerHTML = "<b>Année de sortie:</b> " + data.date_published;
            modalContent.append(movieDatePublished)

            let movieRated = document.createElement("p");
            movieRated.innerHTML = "<b>Evaluation:</b> " + data.rated;
            modalContent.append(movieRated)

            let movieImdb = document.createElement("p");
            movieImdb.innerHTML = "<b>Score imdb:</b> " + data.imdb_score;
            modalContent.append(movieImdb)

            let movieDirectors = document.createElement("p");
            movieDirectors.innerHTML = "<b>Réalisateur:</b> " + data.directors;
            modalContent.append(movieDirectors)

            let movieActors = document.createElement("p");
            movieActors.innerHTML = "<b>Acteurs:</b> " + data.actors;
            modalContent.append(movieActors)

            let movieDuration = document.createElement("p");
            movieDuration.innerHTML = "<b>Durée:</b> " + data.duration + "min";
            modalContent.append(movieDuration)

            let moviecountry = document.createElement("p");
            moviecountry.innerHTML = "<b>Pays d'origine:</b> " + data.countries;
            modalContent.append(moviecountry)

            let movieBoxOffice = document.createElement("p");
            movieBoxOffice.innerHTML = "<b>Box office:</b> " + data.worldwide_gross_income;
            modalContent.append(movieBoxOffice)

            let movieDescription = document.createElement("p");
            movieDescription.innerHTML = "<b>Résumé:</b> " + data.description;
            modalContent.append(movieDescription)

            span.onclick = function() {
                modal.style.display = "none";
                modalContent.innerHTML = "";
              }
        })
    }


    function bestMovieInformation(url) {
        fetchCheckServer(url)
        .then(function (data) {
            let titleMovie = document.querySelector('#bestMovieTitle');
            titleMovie.innerText = data.title;
            let btnBestMovie = document.querySelector('#btnBestMovie')
            btnBestMovie.setAttribute("data-id", data.id);
            let movieDescription = document.querySelector('#bestMovieDescription');
            movieDescription.innerText = data.description;
            let bestMovie = document.querySelector('#bestMovieImg');
            let img = data.image_url;
            document.querySelector("#bestMovie").style.backgroundImage= "url("+ img + ")";
            let id = btnBestMovie.dataset.id
            btnBestMovie.addEventListener('click', () => {
                console.log('la page est chargé');
                modal(id);
            });
        
        })
    }

    function bestMovie() {
        fetchCheckServer("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
        .then(function (data) {
            let bestMovieUrl = data.results[0].url;
            bestMovieInformation(bestMovieUrl);
        })
    }

    function bestMovies() {
    fetchCheckServer("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(function (data){
        let bestMovies = document.querySelector(".slides-container");
        for (let i =0; i < 5; i++) {
            let bestMovieUrl = data.results[i].url;
            fetchCheckServer(bestMovieUrl)
            .then(function (data) {
                let li = document.querySelectorAll('li')[i]
                li.innerHTML = "<img src="+ data.image_url + ">";
            modalInfosMovie(bestMovieUrl, ".slide");
            })
        }
        
        fetchCheckServer(data.next)
        .then(function (data){
            for (let i =0; i < 2; i++) {
                let bestMovieUrl = data.results[i].url;
                fetchCheckServer(bestMovieUrl)
                .then(function (data) {
                    let li = document.querySelectorAll('li')[i+5]
                    li.innerHTML = "<img src="+ data.image_url + ">";
                    modalInfosMovie(bestMovieUrl, ".slide");
                })
            }
        } )
    })  
    }

    function getImage(data, nbr){
        for (i=0;i<nbr;i++){
            urlImage = data.results[i].image_url
            div=document.createElement("div")
            div.style.backgroundImage="url("+ urlImage + ")";
            div.className="imgMovie";
            div.setAttribute("data-id", data.results[i].id);
            container.appendChild(div);
            let id = div.dataset.id
            div.addEventListener('click', () => {
                console.log('la page est chargé');
                modal(id);
            });

        }
    }

    function carousel(url){
        nbr = 5;
        p = 0;
        container = document.querySelector(".container");
        container.style="width"
        left = document.querySelector(".switchLeft");
        right = document.querySelector(".switchRight");
        container.style.width=(800*nbr)+"px";
        fetchCheckServer(url)
        .then(function (data){
            getImage(data, 5)    
            fetchCheckServer(data.next)
            .then(function (data){
                getImage(data, 2)
            })
            let btn = document.querySelector(".imgMovie");
        })

        right.onclick=function(){
            if (p>-nbr+2)
                p--;
                container.style.transform="translate("+p*340+"px)";
                container.style.transition="all 0.5s ease";
        }

        left.onclick=function(){
            if (p<0)
                p++;
                container.style.transform="translate("+p*340+"px)";
                container.style.transition="all 0.5s ease";
    }
}

bestMovie();

carousel("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score");



