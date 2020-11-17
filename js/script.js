// PROYECTO II

// CREO VARIABLES para usar la api
const API_KEY = '4d15e2c7';
const URL = `http://www.omdbapi.com/?apikey=${API_KEY}`;

// hago una varible global de fetch ya que se va ha llamar en varias partes del programa
const globalFetch = (parm) => fetch(`${URL}&${parm}`)
  .then((response) => response.json())
  .then((data) => data);

// creo variables reutilizables
let countPage = 1;
let movieName = '';

// creo la constante list para obtener el id e incorporrar los <li></li> en el DOM
const list = document.getElementById('movie-list');

// función para agregar el titulo de las películas
const addMovies = () => {
  list.innerHTML = '';
  window.scroll(0, 0);

  globalFetch(`s=${movieName}&page=${countPage}`)
    .then((data) => {
      // creo la constante searchData para guardar la respuesta de la api y para usar un forEach
      const searchData = data.Search;
      // recorremos el array de los datos de la api para obtener los titulos de la película
      searchData.forEach((titleData) => {
        const movieslist = document.createElement('li');
        list.appendChild(movieslist);
        // agrego el contenido a la DOM
        const content = `
          <div id='${titleData.imdbID}' class="movie-title">
            ${titleData.Title}
          </div>
        `;
        movieslist.innerHTML = content;
      });
    });
};

// función para llamar los titulos  de la api
const form = document.getElementById('put-movie');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  movieName = form[0].value;
  addMovies();
  form[0].value = '';
});

// función para cargar más películas
const load = document.getElementById('load-more');
const loadMore = () => {
  countPage += 1;
  addMovies();
};
load.addEventListener('click', loadMore);

// función para cargar los detalles de cada película
const addDetailsDOM = (title, id) => {
  const idMovie = document.getElementById(id);
  const contentDetails = document.createElement('div');
  idMovie.appendChild(contentDetails);

  globalFetch(`t=${title}`)
    .then((data) => {
      // agrego el contenido a la DOM
      const content = `
      <div class="container-details clearfix">
        <div class="detailas-poster">
          <img class="details-img" src="${data.Poster}" alt="${data.Title}">
        </div>
        <div class="content-details">
          <p>Year: ${data.Year}</p>
          <p>Runtime: ${data.Runtime}</p>
          <p>Actors: ${data.Actors}</p>
          <p>Metascore: ${data.Metascore}</p>
          <p>Plot: ${data.Plot}</p>
        </div>
      </div>
      `;
      contentDetails.innerHTML = content;
    });
};

// función para llamar los detalles de la api
const movieDetails = (event) => {
  const listTarget = event.target;
  const title = listTarget.innerHTML;
  const id = listTarget.getAttribute('id');
  addDetailsDOM(title, id);
};

list.addEventListener('click', movieDetails);
