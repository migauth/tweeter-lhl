// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// Template for tweeter user data
// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png"
//       ,
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   }
// ]

// Create HTML template for tweets
const createTweetElement = function (tweet) {
  let $tweet = $(
    `<article class="tweet">
      <header class="post header">
        <div class="user">
          <img src="${tweet.user.avatars}" alt="face">
          <span class="user-name">${tweet.user.name}</span>
        </div>
        <span class="tag">${tweet.user.handle}</span>
      </header>
      <p>${tweet.content.text}</p>
      <hr>
      <footer class="post footer">
        <span>${timeago.format(tweet.created_at)}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`)
  return $tweet;
};

// Loop through an array of tweet objects and pass each to createTweetElement
const renderTweets = function (tweets) {
  // loops through tweets
  for (const i of tweets) {
    let $tweet = createTweetElement(i)
    $('#tweets-container').prepend($tweet);
  }
};

$(document).ready(function () {

  const loadTweets = function () {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function (tweets) {
        renderTweets(tweets);
      });
  }

  loadTweets()

  $("#new-tweet").on("submit", function (event) { // Event handler
    if ($('.tweet-text').val() === "" || $('.tweet-text').val() === null) {
      return alert("Empty field, please add comment.")
    } else if ($('.tweet-text').val().length > 140) {
      return alert("Message too long.")
    }
    const $tweetContainer = $('#tweets-container');
    event.preventDefault(); // Prevents form submission
    let serial = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets",
      data: serial,
      success: () => {
        $tweetContainer.empty()
        loadTweets()
      },
      dataType: "text"
    });
  });

})


