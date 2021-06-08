// Send API calls to the database
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1f93f55d9ccd75427e330dc8d18c9386&page=3`;
const IMG_PATH = `https://image.tmdb.org/t/p/w1280`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=1f93f55d9ccd75427e330dc8d18c9386&query="`;

const main = document.getElementById('main')
const form = document.getElementById('form');
const search = document.getElementById('search');

const getMovies = async (url) => {
    const res = await fetch(url)
    const data = await res.json()

    showMovies(data.results);
}

const showMovies = (movies) => {
    main.innerHTML = '';

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie;

        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');

        movieElement.innerHTML = `        
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRating(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>        
        `
        main.appendChild(movieElement)
    })
}

const getClassByRating = (vote) => {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

//Get initial movies
getMovies(API_URL)

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const searchTerm = search.value

    if (searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm);

        search.value = '';
    } else {
        window.location.reload()
    }
})

// Open close the nav menu
const open_btn = document.querySelector('.open-btn');
const close_btn = document.querySelector('.close-btn');
const nav = document.querySelectorAll('.nav');

open_btn.addEventListener('click', () => {
    nav.forEach(nav_element => nav_element.classList.add('visible'))
})
close_btn.addEventListener('click', () => {
    nav.forEach(nav_element => nav_element.classList.remove('visible'))
})
