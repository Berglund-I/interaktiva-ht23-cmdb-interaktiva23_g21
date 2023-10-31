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
                console.error('Filmtitel saknas i OMDB API-svaret för IMDb ID:', imdbID);
                }
            })
            .catch(error => console.error('Fel vid hämtning av OMDB-data:', error));
        });
    })
.catch(error => console.error('Fel vid hämtning av data:', error));
//-----------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------
//Searchfunction 
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
  const apiUrl = `http://www.omdbapi.com/?s=${query}&apikey=f0f87f8f`;

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
        searchResults.innerHTML = 'Inga resultat hittades.'; //bring to front testa det
      }
    })
    .catch(error => {
      console.error('Fel vid sökning:', error);
    });
});

  // Call the getActiveSelection function when the user clicks the search results div
  searchResults.addEventListener('click', getActiveSelection);
  