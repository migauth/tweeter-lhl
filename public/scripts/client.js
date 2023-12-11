// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// Template for tweeter user data
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
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
    "created_at": 1461113959088
  }
]

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
        <span>${tweet.created_at}</span>
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
     // calls createTweetElement for each tweet
    let $tweet = createTweetElement(i)
    // takes return value and appends it to the tweets container
    $('#tweets-container').append($tweet);
  }
};

$(document).ready(function() {
  renderTweets(data)
})
