/*Get current URL and return imdbID*/
const urlParams = new URLSearchParams(window.location.search);
const imdbID = urlParams.get('imdbID');

/*Get movie details from OMDB API and display on movieDetailPage.html*/
fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f`)
  .then(response => response.json())
  .then(movieData => {
    document.querySelector('.movie-frontImage').src = movieData.Poster;
    document.querySelector('.movieTitle').textContent = movieData.Title;
    document.querySelector('.movieYear').textContent =  'Utgivningsår: ' + movieData.Year;
    document.querySelector('.movieDescription').textContent = 'Beskrivning: ' + movieData.Plot;
    document.querySelector('.movieLength').textContent = 'Spellängd: ' + movieData.Runtime;
    document.querySelector('.movieGenre').textContent = 'Genre: ' + movieData.Genre;
  })
.catch(error => console.error('Error:', error));

/*Get movie rating from CMDB API and display on movieDetailPage.html*/
fetch(`https://grupp6.dsvkurs.miun.se/api/movies/${imdbID}`)
    .then(response => response.json())
    .then(movieData => {
        document.querySelector('.movieRating').textContent = 'Poäng: ' + movieData.cmdbScore + ' / 4';
        document.querySelector('.movieVotes').textContent = 'Antal röster: ' + movieData.count;
    })  
.catch(error => console.error('Error:', error));

/*Show ratings from other websites*/
fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=f0f87f8f`)
  .then(response => response.json())
  .then(movieData => {
    // Get references to the HTML elements
    var firstReview = document.querySelector('.firstreview');
    var secondReview = document.querySelector('.secondreview');
    var thirdReview = document.querySelector('.thirdreview');

    movieData.Ratings.forEach(rating => {
      switch (rating.Source) {
        case "Internet Movie Database":
          firstReview.textContent = `${rating.Source}: ${rating.Value}`;
          break;
        case "Rotten Tomatoes":
          secondReview.textContent = `${rating.Source}: ${rating.Value}`;
          break;
        case "Metacritic":
          thirdReview.textContent = `${rating.Source}: ${rating.Value}`;
          break;
        default:
          // If the source doesn't match any of the expected ones, ignore it or handle it appropriately
          break;
      }
    });
  })
  .catch(error => {
    console.error('Error fetching movie data:', error);
  });




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
    
    await sendReviewToAPI(imdbID, reviewer, score, review);
    
  
    // Lås knappen efter att recensionen har skickats
    document.getElementById('submitReview').disabled = true;
    location.reload();
  });
  
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
    const reviews = data.reviews;

    // Sort reviews by date in descending order
    const sortedReviews = reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    const userRatingsElement = document.querySelector('.user-ratings');
    userRatingsElement.innerHTML = '';

    // Initially display only the first two reviews
    data.reviews.slice(0, 2).forEach(appendReview);

    // Show all reviews when the button is clicked
    const showAllReviewsButton = document.getElementById('show-more-reviews');
    showAllReviewsButton.addEventListener('click', function() {
      userRatingsElement.innerHTML = '';
      data.reviews.forEach(appendReview);

      //Hide the button when all the reviews are shown
      showAllReviewsButton.style.display = 'none';
    });

    function appendReview(review, index) {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'user-review';

      const h2Element = document.createElement('h2');
      h2Element.textContent = `Namn: ${review.reviewer}`;
      reviewElement.appendChild(h2Element);
      
      //If the name is null, display "Anonym"
      if(review.reviewer == null) {
        h2Element.textContent = `Namn: Anonym`;
      }

      const ratingElement = document.createElement('p');
      ratingElement.className = 'movieRating';
      ratingElement.textContent = `Betyg: ${review.score}/4`;
      reviewElement.appendChild(ratingElement);

      //If the rating is null, display "Inget betyg"
      if(review.score == null) {
        ratingElement.textContent = `Betyg: Inget betyg`;
      }

      const reviewTextElement = document.createElement('p');
      reviewTextElement.textContent = `Valfri text: ${review.review}`;
      reviewElement.appendChild(reviewTextElement);

      //If the review is null, display "Inget omdöme"
      if(review.review == null) {
        reviewTextElement.textContent = `Valfri text: Inget omdöme`;
      }

      userRatingsElement.appendChild(reviewElement);
    }
  })
  .catch(error => console.error('Error:', error));


