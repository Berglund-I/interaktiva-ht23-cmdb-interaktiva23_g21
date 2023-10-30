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





