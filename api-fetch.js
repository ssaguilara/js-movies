// https://developer.themoviedb.org/reference/trending-movies

const api_base = 'https://api.themoviedb.org/3',
      api_key = '1e1f0cd30baef9adc743a9b49840be29'
      api_key_parameter = '?api_key=' + api_key;   


async function getTrendingMovies() {
    const res = await fetch(`${api_base}/trending/movie/day${api_key_parameter}`);
    // const res = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=' + api_key);
    const data = await res.json();
  
    const movies = data.results; 
    const moviesContainer = document.querySelector('.trending__container .movies__container')

    createMoviesCards(movies, moviesContainer);
}

getTrendingMovies();


async function getUpcomingMovies() {
    const res = await fetch(`${api_base}/movie/upcoming${api_key_parameter}`);
    // const res = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=' + api_key);
    const data = await res.json();
  
    const movies = data.results; 
    const moviesContainer = document.querySelector('.upcoming__container .movies__container')

    createMoviesCards(movies, moviesContainer);
}

getUpcomingMovies();


async function getCategories() {
    const res = await fetch(`${api_base}/genre/movie/list${api_key_parameter}`);
    // const res = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key);
    const data = await res.json();
  
    const categories = data.genres;
    const categoriesContainer = document.querySelector('.categories__container .categories__list')

    categories.forEach(category => { 
        
        const btnCategory = document.createElement('button');
        btnCategory.classList.add('btn-category');
        btnCategory.classList.add( (category == data.genres[0]) ? 'btn-category--select': 'btn-category');
        btnCategory.textContent = category.name;

        categoriesContainer.appendChild(btnCategory)

        btnCategory.addEventListener('click', () => selectCategory(btnCategory,category.id));
    });

}

getCategories();

function selectCategory(btnCategory, categoryId){

    const buttonsCategory = document.querySelectorAll('.btn-category');

    buttonsCategory.forEach(button => {
    button.classList.remove('btn-category--select');
    btnCategory.classList.add('btn-category--select');
    });

    getMoviesByCategory(categoryId)
}

async function getMoviesByCategory(id=28){
    // const res = await fetch('https://api.themoviedb.org/3/discover/movie/list?api_key=' + api_key + 'with_genres=' + id);
    const res = await fetch(`${api_base}/discover/movie${api_key_parameter}&with_genres=${id}`);
    const data = await res.json(); 

    const movies = data.results; 
    const moviesContainer = document.querySelector('.categories__container .movies__container');
    
    moviesContainer.scrollLeft  = 0;
    moviesContainer.innerHTML = ' ';
    // moviesContainer.scrollIntoView({ behavior: 'smooth' })
    createMoviesCards(movies, moviesContainer);
}

getMoviesByCategory();


function createMoviesCards(movies, moviesContainer) {
movies.forEach(movie => {

    const movieCard = document.createElement('div');
    movieCard.classList.add('movie__card');
    movieCard.setAttribute('data-id',movie.id);

    const movieImg = document.createElement('img');
    movieImg.classList.add('movie__card-image');
    movieImg.setAttribute('alt', movie.title);
    movieImg.setAttribute('src','https://image.tmdb.org/t/p/w300' + movie.poster_path);


    const btnLike = document.createElement("button");
    btnLike.classList.add("btn-like");

    if(likedMoviesListLocalStorage()[movie.id])
      btnLike.classList.add('btn-like--liked')

    btnLike.addEventListener("click", () => {
        btnLike.classList.toggle("btn-like--liked")
        likedMovieListUpdate(movie);
        getLikedMovies();
       
    })

    const movieTitle = document.createElement('p');
    movieTitle.textContent = movie.title;

    movieCard.appendChild(movieImg);
    movieCard.appendChild(btnLike);
    movieCard.appendChild(movieTitle);

    moviesContainer.appendChild(movieCard);
    });
}


function likedMoviesListLocalStorage() {

    const moviesLocalStorage = JSON.parse(localStorage.getItem('liked_movies'));
    let movies;
  
    if (moviesLocalStorage) {
      movies = moviesLocalStorage;
    } else {
      movies = {};
    }
    return movies;
  }

function likedMovieListUpdate(movie) { 
    
    const btnslike = document.querySelectorAll(`[data-id="${movie.id}"] .btn-like` )
    
  
    const likedMovies = likedMoviesListLocalStorage();

    if (likedMovies[movie.id]) {
      likedMovies[movie.id] = undefined;
      btnslike.forEach(btnlike => btnlike.classList.remove('btn-like--liked'));
    } else {
      likedMovies[movie.id] = movie;
      btnslike.forEach(btnlike => btnlike.classList.add('btn-like--liked')); 
    }
    
    localStorage.setItem('liked_movies', JSON.stringify(likedMovies));
 }


function getLikedMovies() {

    const likeContainer = document.querySelector('.like__container')
    const moviesContainer = document.querySelector('.like__container .movies__container')

    const likedMovies = likedMoviesListLocalStorage();
    const movies = Object.values(likedMovies);

    if(movies.length == 0)
        likeContainer.classList.add('inactive');
    else
        likeContainer.classList.remove('inactive');
  
    moviesContainer.innerHTML = ' ';
    createMoviesCards(movies, moviesContainer);

}
  
getLikedMovies()
  

const searchMovie = document.querySelector('.search-movie');
const btnSearch = document.querySelector('.btn-search');
const searchContainer = document.querySelector('.search__container')
const btnSearchClose = document.querySelector('.btn-search-close i');

btnSearchClose.addEventListener('click', ()=> searchContainer.classList.add('inactive'))

btnSearch.addEventListener('click', ()=> getMoviesBySearch(searchMovie.value))
searchMovie.addEventListener('keyup', (e) =>{
    if (e.keyCode === 13) { 
        getMoviesBySearch(searchMovie.value);
    }
  });

btnSearch.addEventListener('click', ()=> getMoviesBySearch(searchMovie.value))



async function getMoviesBySearch(query) {
    const res = await fetch(`${api_base}/search/movie${api_key_parameter}&query=${query}`);
    // const res = await fetch('https://api.themoviedb.org/3/search/movie?api_key=' + api_key + 'query=' + query;
    const data = await res.json();
  
    const movies = data.results;
    const moviesContainer = document.querySelector('.search__container .movies__container')


    if(movies.length == 0)
        searchContainer.classList.add('inactive');
    else{
        searchContainer.classList.remove('inactive');
        searchContainer.scrollIntoView({ behavior: 'smooth' })
        searchMovie.focus();
        searchMovie.value = ''
        moviesContainer.innerHTML = ' '
        createMoviesCards(movies, moviesContainer);
    }
 
  }



