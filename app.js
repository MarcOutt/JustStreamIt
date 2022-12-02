async function fetchCheckServer(url) {
    const response = await fetch(url)
    if (response.ok === true) {
        return response.json();
    }
    throw new Error('impossible de contacter le serveur')
}

function modalInfosMovie(url, className) {
    var modal = document.getElementById("myModal");
    var btn = document.querySelector(className);
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
        modalInfosMovie(bestMovieUrl, "#btnBestMovie");
        
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
        })}
        
        fetchCheckServer(data.next)
        .then(function (data){
            for (let i =0; i < 2; i++) {
                let bestMovieUrl = data.results[i].url;
                fetchCheckServer(bestMovieUrl)
                .then(function (data) {
                    let li = document.querySelectorAll('li')[i+5]
                    li.innerHTML = "<img src="+ data.image_url + ">";
                    modalInfosMovie(bestMovieUrl, ".slide");
            })}
        } )
    })  
}

bestMovie()

document.body.onload=function(){
    nbr = 5;
    p = 0;
    container = document.querySelector(".container");
    container.style="width"
    left = document.querySelector(".switchLeft");
    right = document.querySelector(".switchRight");
    container.style.width=(800*nbr)+"px";
    fetchCheckServer("http://localhost:8000/api/v1/titles/?sort_by=-imdb_score")
    .then(function (data){
        for (i=0;i<5;i++){
            urlImage = data.results[i].image_url
            div=document.createElement("div")
            div.style.backgroundImage="url("+ urlImage + ")";
            div.className="photo";
            container.appendChild(div);
            console.log(div);
        }
        fetchCheckServer(data.next)
        .then(function (data){
            for (i=0;i<2;i++){
                urlImage = data.results[i].image_url
                div=document.createElement("div")
                div.style.backgroundImage="url("+ urlImage + ")";
                div.className="photo";
                container.appendChild(div);
                console.log(div);
            }
        })
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
