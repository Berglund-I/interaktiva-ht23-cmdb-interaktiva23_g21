/*Poster*/
fetch('https://grupp6.dsvkurs.miun.se/api/toplists?cmdbScore=DESC&limit=10')
  .then(response => response.json())
  .then(data => {
    // Select all the img elements with the class of "movie-frontImage"
    const imgElements = document.querySelectorAll('.movie-frontImage');

    // Loop through each movie and update its corresponding img element
    data.movies.forEach((movie, index) => {
      // Get the URL of the new image for the current movie
      const imdbID = movie.imdbID;
      const imageUrl = `http://img.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f`;

      // Select the corresponding img element for the current movie
      const imgElement = imgElements[index];

      // Set the src attribute of the img element to the new image URL
      imgElement.src = imageUrl;
    });
  })
.catch(error => console.error('Fel vid hämtning av data:', error));

/*Filmtitel*/
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

/*Årtal*/
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
            const year = `Årtal: ` + omdbData.Year;
            
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

/*Betyg*/
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
            const rating = omdbData.cmdbScore + `/4`;
            
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

/*Sammanfattning*/
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
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//Searchfunction 

//Live Search
document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  const suggestions = document.getElementById('suggestions');
  
  searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value;
  
    // Kontrollera om inmatningen är tillräckligt lång för att starta sökningen
    if (searchTerm.length >= 2) {
      const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=f0f87f8f`;
  
      // Hämta data från OMDb API
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          // Rensa tidigare sökförslag
          suggestions.innerHTML = '';
  
          if (data.Search) {
            // Visa sökförslagen
            suggestions.style.display = 'block';
  
            data.Search.forEach(movie => {
              const suggestion = document.createElement('div');
              suggestion.classList.add('suggestion');

              // Skapa en bild för filmaffischen
              const posterImage = document.createElement('img');
              posterImage.src = movie.Poster;
              posterImage.alt = 'Filmaffisch';
              suggestion.appendChild(posterImage);

              // Skapa en p-element för filmtiteln
              const titleElement = document.createElement('p');
              titleElement.textContent = movie.Title;
              titleElement.classList.add('title'); // Lägg till en klass för titeln
              suggestion.appendChild(titleElement);

              suggestion.addEventListener('click', () => {
                // Hantera när användaren klickar på ett förslag, t.ex. fyll i sökrutan med förslaget
                searchInput.value = movie.Title;
                suggestions.style.display = 'none';
              });
              suggestions.appendChild(suggestion);
            });
          } else {
            suggestions.style.display = 'none';
          }
        })
        .catch(error => {
          console.error('Fel vid sökning:', error);
        });
    } else {
      // Om inmatningen är för kort, dölj förslagen
      suggestions.style.display = 'none';
    }
  });
  
}); 

//SearchResults
function getActiveSelection() {
  const selection = window.getSelection().toString();
  console.log(selection);
}

document.addEventListener('DOMContentLoaded', () => {
  const searchResultsNotFound = document.querySelector('#search-results');
  const searchResults = document.getElementById('search-results');

  // Get the search query from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('search');

  // Skapa URL för OMDb API-sökning
  const apiUrl = `https://www.omdbapi.com/?s=${query}&apikey=f0f87f8f`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // Rensa tidigare sökresultat
      searchResults.innerHTML = '';

      if (data.Search) {
        // Skapa en ny div för sökresultaten
        const searchResultsDiv = document.createElement('div');
        searchResultsDiv.classList.add('search-results');

        data.Search.forEach((movie) => {
          // Skapa en div för varje sökresultat och visa information
          const movieElement = document.createElement('div');
          const movieImage = document.createElement('img');
          const movieTitle = document.createElement('h3');
          const movieYear = document.createElement('p');
          const movieType = document.createElement('p');

          movieImage.src = movie.Poster;
          movieTitle.textContent = movie.Title;
          movieYear.textContent = `Årtal: ${movie.Year}`;
          movieType.textContent = `Typ: ${movie.Type}`;

          movieElement.appendChild(movieImage);
          movieElement.appendChild(movieTitle);
          movieElement.appendChild(movieYear);
          movieElement.appendChild(movieType);

          movieElement.addEventListener('click', getActiveSelection); // Add click event listener to each search result
          searchResultsDiv.appendChild(movieElement);
        });

        // Lägg till sökresultaten i sökresultatssektionen
        searchResults.appendChild(searchResultsDiv);
      } else {
        const noResultsMessage = document.createElement('h1');
        noResultsMessage.textContent = 'Inga resultat hittades';
        noResultsMessage.className = 'noResultsMessage'; 
        searchResults.appendChild(noResultsMessage); 
        const emptyDiv = document.createElement('div');
        emptyDiv.style.height = '500px'; // Adjust this value as needed
        searchResults.appendChild(emptyDiv);
      }
    })
    .catch(error => {
      console.error('Fel vid sökning:', error);
    });
});

  // Call the getActiveSelection function when the user clicks the search results div
  searchResults.addEventListener('click', getActiveSelection);
  





