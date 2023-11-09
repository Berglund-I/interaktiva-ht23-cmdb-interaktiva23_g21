
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

//-------------------------------------------------------------------------------------------------------
//Ratingsystem 
document.addEventListener('DOMContentLoaded', () => {
  
  document.getElementById('reviewForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const imdbID = urlParams.get('imdbID');
    const reviewer = document.getElementById('name').value;
    const score = document.getElementById('rating').value;
    const review = document.getElementById('comment').value;
  
    // Skicka recensionen till API:et
    // Betygsätt filmen
    await rateMovie(imdbID, score);
    await sendReviewToAPI(imdbID, reviewer, score, review);
    
  
    // Lås knappen efter att recensionen har skickats
    document.getElementById('submitReview').disabled = true;
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
      console.log(`Filmen har blivit betygsatt med poängen ${score}.`);
    })
    .catch(error => {
      console.error('Fel vid betygsättning av filmen:', error);
    });
  }
});

function createReviewObject(imdbID, reviewer, score, review){
  return {
    imdbID: imdbID,
    reviewer: reviewer,
    score: Number(score),
    review: review
  };
}

async function sendReviewToAPI(imdbID, reviewer, score, review) {
  //Skapa ett nytt object istället
  const newReview = createReviewObject(imdbID, reviewer, score, review);
  
  const reviewUrl = 'https://grupp6.dsvkurs.miun.se/api/movies/review';

  return fetch(reviewUrl, {
      method: 'POST',
      body: JSON.stringify(newReview),
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      const responseMessageElement = document.getElementById('responseMessage');
      if (responseMessageElement) {
          responseMessageElement.textContent = 'Recensionen har skickats!';
          console.log(`Personen heter ${reviewer} och kommenterade ${review}.`);
      }
  })
  .catch(error => {
      console.error('Fel vid skickande av recension:', error);
      const responseMessageElement = document.getElementById('responseMessage');
      if (responseMessageElement) {
          responseMessageElement.textContent = 'Något gick fel. Försök igen senare.';
      }
  });

}


