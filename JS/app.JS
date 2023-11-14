/*Get poster for top 10 movies and display in index.html*/
fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
  .then(response => response.json())
  .then(data => {
    const imgElements = document.querySelectorAll('.movie-frontImage');
    const buttons = document.querySelectorAll('.buttonGold-ReadMore');

    data.movies.forEach((movie, index) => {
      const imdbID = movie.imdbID;

      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f`)
        .then(response => response.json())
        .then(movieData => {
          const imgElement = imgElements[index];
          imgElement.src = movieData.Poster;

          const button = buttons[index];
          button.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = `movieDetailPage.html?imdbID=${imdbID}`;
          });
        })
        .catch(error => console.error('Error fetching movie data:', error));
    });
  })
.catch(error => console.error('Error fetching movie list:', error));

/*Get title for each movie in top 10 and display in index.html*/
fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
  .then(response => response.json())
  .then(data => {
    
    const titleElements = document.querySelectorAll('.movieTitle');

    data.movies.forEach((movie, index) => {
      const imdbID = movie.imdbID;

      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f&plot=Title`)
      .then(response => response.json())
      .then(omdbData => {
        if(omdbData.Title) {
            const title = omdbData.Title;
            
            const titleElement = titleElements[index];
            
            titleElement.textContent = title;
            } else {
                console.error('Filmtitel saknas i OMDB API-svaret för IMDb ID:', imdbID);
                }
            })
            .catch(error => console.error('Fel vid hämtning av OMDB-data:', error));
        });

    })
.catch(error => console.error('Fel vid hämtning av data:', error));

/*Get year for all top 10 movies and display in index.html*/
fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
  .then(response => response.json())
  .then(data => {
    
    const yearElements = document.querySelectorAll('.movieYear');

    data.movies.forEach((movie, index) => {
      const imdbID = movie.imdbID;

      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f&plot=Year`)
      .then(response => response.json())
      .then(omdbData => {
        if(omdbData.Year) {
            const year = `Utgivningsår: ` + omdbData.Year;
            
            const yearElement = yearElements[index];
            
            yearElement.textContent = year;
            } else {
                console.error('Filmtitel saknas i OMDB API-svaret för IMDb ID:', imdbID);
                }
            })
            .catch(error => console.error('Fel vid hämtning av OMDB-data:', error));
        });
    })
.catch(error => console.error('Fel vid hämtning av data:', error));

/*Get rate for all top 10 movies and display in index.html*/
fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
  .then(response => response.json())
  .then(data => {
    
    const ratingElements = document.querySelectorAll('.movieRating');

    data.movies.forEach((movie, index) => {
      const imdbID = movie.imdbID;

      fetch(`https://grupp6.dsvkurs.miun.se/api/movies/${imdbID}`)
      .then(response => response.json())
      .then(omdbData => {
        if(omdbData.cmdbScore) {
            const rating = `Poäng: ` + omdbData.cmdbScore + `/4`;
            
            const ratingElement = ratingElements[index];
            
            ratingElement.textContent = rating;
            } else {
                console.error('Filmens årtal saknas i OMDB API-svaret för IMDb ID:', imdbID);
                }
            })
            .catch(error => console.error('Fel vid hämtning av OMDB-data:', error));
        });
    })
.catch(error => console.error('Fel vid hämtning av data:', error));

/*Get plot for each movie in top 10 and display in index.html*/
fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
  .then(response => response.json())
  .then(data => {
    
    const plotElements = document.querySelectorAll('.movieDescription');

    data.movies.forEach((movie, index) => {
      const imdbID = movie.imdbID;

      fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f&plot=Plot`)
      .then(response => response.json())
      .then(omdbData => {
        if(omdbData.Plot) {
            const plot = `Beskrivning: ` + omdbData.Plot;
            
            const plotElement = plotElements[index];
            
            plotElement.textContent = plot;
            } else {
                console.error('Filmens årtal saknas i OMDB API-svaret för IMDb ID:', imdbID);
                }
            })
            .catch(error => console.error('Fel vid hämtning av OMDB-data:', error));
        });
    })
.catch(error => console.error('Fel vid hämtning av data:', error));

// Call the getActiveSelection function when the user clicks the search results div
searchResults.addEventListener('click', getActiveSelection);

//------------------------------------------------------------------------------------
document.addEventListener('DOMContentLoaded', () => {
  fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
    .then(response => response.json())
    .then(data => {
      const ratingForm = document.getElementById('ratingForm');
      const submitReviewButton = document.getElementById('submitRating');
      const ratingOnlyInput = document.getElementById('ratingOnly');

      ratingForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Get the selected movie
        const selectedMovieIndex = ratingOnlyInput.dataset.selectedMovieIndex;
        const selectedMovie = data.movies[selectedMovieIndex];

        const imdbID = selectedMovie.imdbID;
        const score = ratingOnlyInput.value;

        await rateMovie(imdbID, score);

        // Disable the button after the review has been sent
        submitReviewButton.disabled = true;
      });
    })
    .catch(error => console.error('Fel vid hämtning av data:', error));
});
async function rateMovie(imdbID, score) {
  const rateUrl = `https://grupp6.dsvkurs.miun.se/api/movies/rate/${imdbID}/${score}`;

  return fetch(rateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    const responseMessageElement = document.getElementById('responseMessageToRating');
    if (responseMessageElement) {
        responseMessageElement.textContent = 'Filmen har fått poäng!';
        console.log(`Filmen har blivit betygsatt med poängen ${score}.`);
    }
  })
  .catch(error => {
    console.error('Fel vid betygsättning av filmen:', error);
  });
}





/*async function rateMovie(imdbID, score) {
  const starRateUrl = 'https://grupp6.dsvkurs.miun.se/api/movies/rate/${imdbID}/${score}';

  return fetch(rateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('Filmen har blivit betygsatt med poängen ${score}.');
  })
  .catch(error => {
    console.error('Fel vid betygsättning av filmen:', error);
  });
}*/


  



