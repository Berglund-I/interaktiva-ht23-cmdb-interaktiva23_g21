
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f`)
  .then(response => response.json())
  .then(movieData => {
    document.querySelector('.movie-frontImage').src = movieData.Poster;
    document.querySelector('.movieTitle').textContent = movieData.Title;
    document.querySelector('.movieYear').textContent =  'Årtal: ' + movieData.Year;
    document.querySelector('.movieDescription').textContent = 'Beskrivning: ' + movieData.Plot;
  })
.catch(error => console.error('Error:', error));

fetch(`https://grupp6.dsvkurs.miun.se/api/movies/${imdbID}`)
    .then(response => response.json())
    .then(movieData => {
        document.querySelector('.movieRating').textContent = 'Poäng: ' + movieData.cmdbScore + ' / 4';
        document.querySelector('.movieVotes').textContent = 'Antal röster: ' + movieData.count;
    })  
.catch(error => console.error('Error:', error));