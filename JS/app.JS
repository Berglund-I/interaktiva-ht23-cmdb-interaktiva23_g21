/*Poster*/
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

  


