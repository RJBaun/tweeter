/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {



  const createTweetMarkup = (tweet) => {
    let $tweet = `
    <article class="tweet">
    <header>
      <div class="poster">
        <img src="${tweet.user.avatars}" alt"${tweet.user.name}'s profile picture"></i>
        <span>${tweet.user.name}</span>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <span class="tweet-body">${tweet.content.text}</span>
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <span class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>`;
  return $tweet;
  }

  // renders tweets on the page using the markup function
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
        $("#tweets-container").prepend(createTweetMarkup(tweet));
      };
    }

    // handles new twett submissions
  $('#newTweet').submit(function(event) {
    event.preventDefault();
    formData = $(this).serialize();

    tweetText = event.target.elements['text'].value;

    if(tweetText.trim() === '') {
      alert("Your tweet is empty!")
    } else if (tweetText.length > 140) {
      alert("Maximum characters exceeded")
    } else {
    $.ajax({
      url:'http://localhost:8080/tweets/',
      method: 'POST',
      data: formData
    })
    .then(loadTweets())
    .catch((err) => {
      console.log('Error: ', err)
    })
    $(this).trigger('reset');
    }
  });

  // loads existing tweets
  const loadTweets = () => {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET'
    })
    .then((res) => {
      renderTweets(res);
    })
    .catch((err) => {
      console.log('error: ', err);
      res.status(404).send(err);
    })
  }
loadTweets();


});


