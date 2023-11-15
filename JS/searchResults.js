//Live Search
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search-input');
    const suggestions = document.getElementById('suggestions');
    
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value;
    
      //Checks if the input is long enough to start the search
      if (searchTerm.length >= 2) {
        const apiUrl = `https://www.omdbapi.com/?s=${searchTerm}&apikey=f0f87f8f`;
    
        //Retrieves data from the OMDb API 
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
           
            // Clears previous search suggestions
            suggestions.innerHTML = '';
    
            if (data.Search) {
              // Shows the search suggestions
              suggestions.style.display = 'block';
    
              data.Search.forEach(movie => {
                const suggestion = document.createElement('div');
                suggestion.classList.add('suggestion');
  
                // Creates an image for the movie poster
                const posterImage = document.createElement('img');
                posterImage.src = movie.Poster;
                posterImage.alt = 'Filmaffisch';
                suggestion.appendChild(posterImage);
  
                // Creates a p element for the movie title
                const titleElement = document.createElement('p');
                titleElement.textContent = movie.Title;
                titleElement.classList.add('title'); 
                suggestion.appendChild(titleElement);
  
                suggestion.addEventListener('click', () => {
                 // Handles when the user clicks on a suggestion, by filling in the search box with the suggestion
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
        // If the input is too short, hide the suggestions
        suggestions.style.display = 'none';
      }
    });
    
  }); 
 
//----------------------------------------------------------------------------------------  
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
  
    // Creates URL for OMDb API search to retrieve IMDb ID of the movies
    const apiKey = 'f0f87f8f';
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Clears previous search results
        searchResults.innerHTML = '';
  
        if (data.Search) {
          // Creates a new div for the search results
          const searchResultsDiv = document.createElement('div');
          searchResultsDiv.classList.add('search-results');
  
          data.Search.forEach((movie) => {
            // Gets the IMDb ID of the movie
            const imdbID = movie.imdbID;

            const movieDetailsUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
            fetch(movieDetailsUrl)
                .then(response => response.json())
                .then(movieDetails => {
                  // The information about the movie to be inserted into the div
                  const movieElement = document.createElement('div');
                  const moviePoster = document.createElement('img');
                  const movieTitle = document.createElement('h3');
                  const movieYear = document.createElement('h2');
                  const movieRunTime = document.createElement('h3');
                  const movieGenre = document.createElement('h3');
                  const moviePlot = document.createElement('p');
                  const button = document.createElement('a'); // Creates a link for the button
                  button.href = `movieDetailPage.html?imdbID=${imdbID}`;
                  button.className = 'buttonGold-ReadMore';
                  button.textContent = 'Läs mer';

                  movieElement.classList.add('movieBest-rated'); 
                  moviePoster.classList.add('moviePosterSize');
                  movieTitle.classList.add('movieTitle');
                  movieYear.classList.add('movieYear');
                  movieRunTime.classList.add('movieRunTime'); 
                  movieGenre.classList.add('movieGenre'); 
                  moviePlot.classList.add('movieDescription');

                  moviePoster.src = movieDetails.Poster;
                  moviePoster.alt = `Poster for ${movieDetails.Title}`;
                  movieTitle.textContent = movieDetails.Title;
                  movieYear.textContent = movieDetails.Year;
                  movieRunTime.textContent = movieDetails.Runtime;
                  movieGenre.textContent = movieDetails.Genre;
                  moviePlot.textContent = movieDetails.Plot;
                  
                  movieElement.appendChild(moviePoster);
                  movieElement.appendChild(movieTitle);
                  movieElement.appendChild(movieYear);
                  movieElement.appendChild(movieRunTime);
                  movieElement.appendChild(movieGenre);
                  movieElement.appendChild(moviePlot);
                  movieElement.appendChild(button);
                  
  
                  movieElement.addEventListener('click', getActiveSelection);
                  searchResultsDiv.appendChild(movieElement);
                })
                .catch(error => {
                  console.error('Fel vid hämtning av filmens detaljer:', error);
                }); 

          });
  
          // Adds the search results to the search results section
          searchResults.appendChild(searchResultsDiv);
        } else {
          const noResultsMessage = document.createElement('h1');
          noResultsMessage.textContent = 'Inga resultat hittades';
          noResultsMessage.className = 'noResultsMessage';
          searchResults.appendChild(noResultsMessage);
          const emptyDiv = document.createElement('div');
          emptyDiv.style.height = '500px'; 
          searchResults.appendChild(emptyDiv);
        }
      })
      .catch(error => {
        console.error('Fel vid sökning:', error);
      });
  });
  
  // Call the getActiveSelection function when the user clicks the search results div
  searchResults.addEventListener('click', getActiveSelection);
    //---------------------------------------------------------------------------------------- 




