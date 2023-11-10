
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f`)
  .then(response => response.json())
  .then(movieData => {
    document.querySelector('.movie-frontImage').src = movieData.Poster;
    document.querySelector('.movieTitle').textContent = movieData.Title;
    document.querySelector('.movieYear').textContent =  'Årtal: ' + movieData.Year;
    document.querySelector('.movieDescription').textContent = 'Beskrivning: ' + movieData.Plot;
    document.querySelector('.movieLength').textContent = 'Spellängd: ' + movieData.Runtime;
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

//--------------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
  const sendReviewButton = document.getElementById('send-review');
  if (sendReviewButton) {
    sendReviewButton.addEventListener('click', function (event) {
      event.preventDefault();
      submitReview();
    });
  } else {
    console.error('Element with id "send-review" not found');
  }
});

//Show reviews
fetch(`https://grupp6.dsvkurs.miun.se/api/movies/${imdbID}`)
  .then(response => response.json())
  .then(data => {
    const userRatingsElement = document.querySelector('.user-ratings');
    userRatingsElement.innerHTML = '';

    // Initially display only the first two reviews
    data.reviews.slice(0, 2).forEach(appendReview);

    // Show all reviews when the button is clicked
    const showAllReviewsButton = document.getElementById('show-more-reviews');
    showAllReviewsButton.addEventListener('click', function() {
      userRatingsElement.innerHTML = '';
      data.reviews.forEach(appendReview);

      // Hide the button
      showAllReviewsButton.style.display = 'none';
    });

    function appendReview(review, index) {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'user-review';

      const h2Element = document.createElement('h2');
      h2Element.textContent = `Namn:`;
      reviewElement.appendChild(h2Element);

      if(review.name == null) {
        h2Element.textContent = `Namn: Anonym`;
      }

      const ratingElement = document.createElement('p');
      ratingElement.className = 'movieRating';
      ratingElement.textContent = `Betyg: ${review.score}/4`;
      reviewElement.appendChild(ratingElement);

      if(review.score == null) {
        ratingElement.textContent = `Betyg: Inget betyg`;
      }

      const reviewTextElement = document.createElement('p');
      reviewTextElement.textContent = `Valfri text: ${review.review}`;
      reviewElement.appendChild(reviewTextElement);

      if(review.review == null) {
        reviewTextElement.textContent = `Valfri text: Inget omdöme`;
      }

      userRatingsElement.appendChild(reviewElement);
    }
  })
  .catch(error => console.error('Error:', error));


