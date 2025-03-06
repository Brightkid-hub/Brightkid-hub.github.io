// FAQ Function (Example)
function show1() {
    const faqAnswers = document.getElementsByClassName("faq-answer1");
    for (let i = 0; i < faqAnswers.length; i++) {
        faqAnswers[i].style.display = "block";
    }
}

function show2() {
    const faqAnswers = document.getElementsByClassName("faq-answer2");
    for (let i = 0; i < faqAnswers.length; i++) {
        faqAnswers[i].style.display = "block";
    }
}

function show3() {
    const faqAnswers = document.getElementsByClassName("faq-answer3");
    for (let i = 0; i < faqAnswers.length; i++) {
        faqAnswers[i].style.display = "block";
    }
}

function show4() {
    const faqAnswers = document.getElementsByClassName("faq-answer4");
    for (let i = 0; i < faqAnswers.length; i++) {
        faqAnswers[i].style.display = "block";
    }
}

function show5() {
    const faqAnswers = document.getElementsByClassName("faq-answer5");
    for (let i = 0; i < faqAnswers.length; i++) {
        faqAnswers[i].style.display = "block";
    }
}

// TMDB API (Replace with your actual API key)
const tmdbAPI = "b8345d00ed3c1256caba64179516ef72"; //Replace YOUR_TMDB_API_KEY

// Mock Music API (Replace with a real music API)
const musicAPI = "https://api.mocki.io/v1/00000000-0000-0000-0000-000000000000/music?query="; //Example mock api, replace with your own.

function searchContent() {
    const query = document.getElementById("searchInput").value;

    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    document.getElementById("popular-music").style.display = 'none';
    document.getElementById("top-movies").style.display = 'none';

    fetchMusic(query);
    fetchMovies(query);
}

function fetchMusic(query) {
    fetch(musicAPI + query)
        .then(response => {
             if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const musicList = document.querySelector(".music-list");
            musicList.innerHTML = '';

            if (data && data.results && data.results.length > 0) {
                data.results.forEach(music => {
                    const musicCard = document.createElement('div');
                    musicCard.classList.add('card');
                    musicCard.innerHTML = `
                        <img src="${music.album_cover}" alt="Album Cover">
                        <div class="title">${music.name}</div>
                        <div class="artist">${music.artist}</div>
                    `;
                    musicList.appendChild(musicCard);
                });
                document.getElementById("popular-music").style.display = 'block';
            } else {
                musicList.innerHTML = "No music found.";
                document.getElementById("popular-music").style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Error fetching music data:", error);
            document.querySelector(".music-list").innerHTML = "Error fetching music.";
            document.getElementById("popular-music").style.display = 'block';
        });
}

function fetchMovies(query) {
    fetch(tmdbAPI + query)
        .then(response => response.json())
        .then(data => {
            const moviesList = document.querySelector(".movies-list");
            moviesList.innerHTML = '';

            if (data.results && data.results.length > 0) {
                data.results.forEach(movie => {
                    const movieCard = document.createElement('div');
                    movieCard.classList.add('card');
                    movieCard.innerHTML = `
                        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
                        <div class="title">${movie.title}</div>
                    `;
                    moviesList.appendChild(movieCard);
                });
                document.getElementById("top-movies").style.display = 'block';
            } else {
                moviesList.innerHTML = "No movies found.";
                document.getElementById("top-movies").style.display = 'block';
            }
        })
        .catch(error => {
            console.error("Error fetching movie data:", error);
            document.querySelector(".movies-list").innerHTML = "Error fetching movies.";
            document.getElementById("top-movies").style.display = 'block';
        });
}