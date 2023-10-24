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