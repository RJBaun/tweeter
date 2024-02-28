/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  const tweetData = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1708906976028
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1708993376028
    }
  ]

  const createTweetElement = (tweet) => {
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
      <span>${tweet.created_at}</span>
      <span class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>`;
  return $tweet;
  }

  const renderTweets = (tweets) => {
    for (const tweet of tweets) {

        $("#tweets-container").append(createTweetElement(tweet));
      };
    }
    renderTweets(tweetData);


  $('#newTweet').submit(function(event) {
    event.preventDefault();
    formData = $(this).serialize();

    $.ajax({
      url:'http://localhost:8080/tweets/',
      method: 'POST',
      data: formData
    })
    .then(console.log(formData))
  });



});


