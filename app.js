async function fetchCheckServer(url) {
    const response = await fetch(url)
    if (response.ok === true) {
        return response.json();
    }
    throw new Error('impossible de contacter le serveur')
}

function modalInfosMovie(url) {
    var modal = document.getElementById("myModal");
    var btn = document.getElementById("btnBestMovie");
    var span = document.getElementsByClassName("close")[0];
    btn.onclick = function() {
        modal.style.display = "block";
    }
    span.onclick = function() {
    modal.style.display = "none";}
    fetchCheckServer(url)
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

    })
}

function bestMovieInformation(url) {
    fetchCheckServer(url)
    .then(function (data) {
        let titleMovie = document.querySelector('#bestMovieTitle');
        titleMovie.innerText = data.title;
        let movieDescription = document.querySelector('#bestMovieDescription');
        movieDescription.innerText = data.description;
        let bestMovie = document.querySelector('#bestMovieImg');
        let img = data.image_url;
        document.querySelector("#bestMovie").style.backgroundImage= "url("+ img + ")";
    
    })
}

function bestMovie() {
    fetchCheckServer("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(function (data) {
        let bestMovieUrl = data.results[0].url;
        bestMovieInformation(bestMovieUrl);
        modalInfosMovie(bestMovieUrl);
        
})
}

function getUrlmovie(data, moviesNumber) {
    let moviesImgUrl= Array()
        for (let i =0; i < moviesNumber; i++) {
            let bestMovieUrl = data.results[i].url
            fetchCheckServer(bestMovieUrl)
            .then(function (data) {
                let movieImgUrl = data.image_url
                moviesImgUrl.push(movieImgUrl)})}
    return moviesImgUrl
}

function getMoviesImgUrl() {
    fetchCheckServer("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    
    .then(function (data){
        let moviesImgUrl= Array()
        let urlMovies1 = getUrlmovie(data, 5)
        moviesImgUrl.push(urlMovies1)
        let nextPageUrl = data.next
        fetchCheckServer(nextPageUrl)
        .then(function(data){
            let urlMovies2 = getUrlmovie(data, 2)
            moviesImgUrl.push(urlMovies2)
            })
        console.log(moviesImgUrl)
    })     
    
}

bestMovie()
getMoviesImgUrl()

