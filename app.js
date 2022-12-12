
/* Vérifie la connexion à l'api */
async function fetchCheckServer(url) {
    const response = await fetch(url)
    if (response.ok === true) {
        return response.json();
    }
    throw new Error('impossible de contacter le serveur')
}

/* Création de la fenêtre du modal */
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

    /* Récupère les infos pour la section bestMovie */
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
                modal(id);
            });
        
        })
    }

    /* Lance le chargement de l'api et récupère les infos du film */
    function bestMovie() {
        fetchCheckServer("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
        .then(function (data) {
            let bestMovieUrl = data.results[0].url;
            bestMovieInformation(bestMovieUrl);
        })
    }

    /* Création du carousel */
    function carousel(url, className, categoryLeft, categoryRight){
        let categorie = document.querySelector(className);
        let carouselMovies = document.createElement("div");
        carouselMovies.setAttribute("class", "carouselMovies");
        categorie.append(carouselMovies);

        let carousel = document.createElement('div');
        carousel.setAttribute("class", "carousel");
        carouselMovies.append(carousel);

        let switchLeft = document.createElement("a");
        switchLeft.innerHTML = "<a class='switchLeft' id=" + categoryLeft + " data-position=0 id=><</a>";
        carousel.append(switchLeft);

        let switchRight = document.createElement("a");
        switchRight.innerHTML = "<a class='switchRight'  id=" + categoryRight + " data-position=0 >></a>";
        carousel.append(switchRight);

        let container = document.createElement("div")
        container.setAttribute('class', "container")
        carousel.append(container)
        nbr = 5;
        container.style="width"
        container.style.width=(800*nbr)+"px";
        fetchCheckServer(url)
        .then(function (data){
            getImage(data, 5, container)    
            fetchCheckServer(data.next)
            .then(function (data){
                getImage(data, 2, container)
            })
        })
        /*Tourne le carousel à gauche lors du clic de la souris sur la flèche */
        switchRight.onclick=function(){
            let right = document.getElementById(categoryRight)
            console.log(right)
            let left = document.getElementById(categoryLeft)
            p = right.dataset.position
            if (p>-nbr+2)
                p--;
                container.style.transform="translate("+p*350+"px)";
                container.style.transition="all 0.5s ease";
                console.log(p)
                right.dataset.position = p
                left.dataset.position = p
 
        }
        /*Tourne le carousel à gauche lors du clic de la souris sur la flèche */
        switchLeft.onclick=function(){
            let right = document.getElementById(categoryRight)
            console.log(right)
            let left = document.getElementById(categoryLeft)
            p = right.dataset.position
            if (p<0)
                p++;
                container.style.transform="translate("+p*350+"px)";
                container.style.transition="all 0.5s ease";
                right.dataset.position = p
                left.dataset.position = p
    }
}
/* Récupère les images des films */
function getImage(data, nbr, container){
    for (i=0;i<nbr;i++){
        urlImage = data.results[i].image_url
        div=document.createElement("div")
        div.style.backgroundImage="url("+ urlImage + ")";
        div.className="imgMovie";
        div.setAttribute("data-id", data.results[i].id);
        container.appendChild(div);
        let id = div.dataset.id
        div.addEventListener('click', () => {
            modal(id);
        });

    }
}


bestMovie();
carousel("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score", "#bestMovies", "1l", "1r" );
carousel("http://localhost:8000/api/v1/titles/?genre_contains=comedy&sort_by=-imdb_score", "#comedyMovies", "2l", "2r" );
carousel("http://localhost:8000/api/v1/titles/?genre_contains=animation&sort_by=-imdb_score", "#animationMovies", "3l", "3r" );
carousel("http://localhost:8000/api/v1/titles/?genre_contains=action&sort_by=-imdb_score", "#actionMovies", "4l", "4r" );




