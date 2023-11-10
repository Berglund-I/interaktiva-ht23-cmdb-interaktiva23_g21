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
  
    // Skapa URL för OMDb API-sökning för att hämta IMDb-ID för filmerna
    const apiKey = 'f0f87f8f';
    fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        // Rensa tidigare sökresultat
        searchResults.innerHTML = '';
  
        if (data.Search) {
          // Skapa en ny div för sökresultaten
          const searchResultsDiv = document.createElement('div');
          searchResultsDiv.classList.add('search-results');
  
          data.Search.forEach((movie) => {
            // Hämta IMDb-ID för filmen
            const imdbID = movie.imdbID;

            const movieDetailsUrl = `https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
            fetch(movieDetailsUrl)
                .then(response => response.json())
                .then(movieDetails => {
                  // Skapa en div för att visa detaljer om filmen
                  const movieElement = document.createElement('div');
                  const moviePoster = document.createElement('img');
                  const movieTitle = document.createElement('h1');
                  const movieYear = document.createElement('h2');
                  const movieRunTime = document.createElement('h3');
                  const movieGenre = document.createElement('h3');
                  const moviePlot = document.createElement('p');
                  const button = document.createElement('a'); // Skapa en länk för knappen
                 
                  button.href = `movieDetailPage.html?imdbID=${imdbID}`;
                  button.className = 'buttonGold-ReadMore';
                  button.textContent = 'Läs mer';

                  moviePoster.src = movieDetails.Poster;
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

            // Skapa en div för varje sökresultat och visa information
            searchResults.appendChild(searchResultsDiv);
            
          });
  
          // Lägg till sökresultaten i sökresultatssektionen
          searchResults.appendChild(searchResultsDiv);
        } else {
          const noResultsMessage = document.createElement('h1');
          noResultsMessage.textContent = 'Inga resultat hittades';
          noResultsMessage.className = 'noResultsMessage';
          searchResults.appendChild(noResultsMessage);
          const emptyDiv = document.createElement('div');
          emptyDiv.style.height = '500px'; // Justera detta värde vid behov
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
// Filter function



