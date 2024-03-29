/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {


  // formats tweet into html 
  const createTweetMarkup = (tweet) => {
    let $tweet = $(`
    <article class="tweet">
    <header>
      <div class="poster">
        <img src="${tweet.user.avatars}" alt"${tweet.user.name}'s profile picture"></i>
        <span>${tweet.user.name}</span>
      </div>
      <span class="handle">${tweet.user.handle}</span>
    </header>
    <body>
    <span class="tweet-body">${tweet.content.text}</span>
    <body>
    <footer>
      <span>${timeago.format(tweet.created_at)}</span>
      <span class="icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </span>
    </footer>
  </article>
  `);
  $tweet.find('.tweet-body').text(tweet.content.text);
  return $tweet;
}

// confirms tweet meets length criteria and populates error if not
const tweetIsValid = (tweetText) => {
  if(tweetText.trim() === '') {
    $('#tweet-error').html('<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;&nbsp;Text field is empty!&nbsp;&nbsp;<i class="fa-solid fa-triangle-exclamation"></i>')
    $('#tweet-error').slideDown(500);
    $('#tweet-text').focus();
    setTimeout(() => {
      $('#tweet-error').slideUp(500);
    }, 3500);
    return false;
  } else if (tweetText.trim().length > 140) {
    $('#tweet-error').html('<i class="fa-solid fa-triangle-exclamation"></i>&nbsp;&nbsp;Maximum number of charaters exceeded!&nbsp;&nbsp;<i class="fa-solid fa-triangle-exclamation"></i>')
    $('#tweet-error').slideDown(500);
    $('#tweet-text').focus();
    setTimeout(() => {
      $('#tweet-error').slideUp(500);
    }, 3500);
    return false;
  }
  return true;
}
 
// renders tweets on the page using the markup function
  const renderTweets = (tweets) => {
    $("#tweets-container").empty();
    for (const tweet of tweets) {
        $("#tweets-container").prepend(createTweetMarkup(tweet));
      };
    }
    
    // loads existing tweets
    const loadTweets = () => {
      $.ajax({
        url: '/tweets',
        method: 'GET'
      })
      .then((res) => {
        renderTweets(res);
      })
      .catch((err) => {
        console.log('error: ', err);
      })
    }

    // handles new twett submissions
  $('#newTweet').submit(function(event) {
    event.preventDefault();
    formData = $(this).serialize();

    tweetText = event.target.elements['text'].value;

    if(tweetIsValid(tweetText)){
      $.ajax({
        url:'/tweets/',
        method: 'POST',
        data: formData
      })
      .then((res) => {
        $(this).trigger('reset');
        $('#charCounter').html(140)
        loadTweets()})
      .catch((err) => {
        console.log('Error: ', err)
      })
    }
  });

  // shows/hides new tweet section
  const toggleNewTweet = () => {
    const newTweetSection = $('#new-tweet');
    if (newTweetSection.css('display') === 'none') {
      newTweetSection.slideDown();
      newTweetSection.find('textarea').focus()
    } else {
      newTweetSection.slideUp();
    }
  }

  // event listener for new-tweet toggle 
  $('#tweet-dropdown').click(toggleNewTweet)

// fetches tweets upon page loading 
loadTweets();


});


