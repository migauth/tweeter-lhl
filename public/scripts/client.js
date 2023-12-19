// /*
//  * Client-side JS logic goes here
//  * jQuery is already loaded
//  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
//  */

// Prevent Cross-Site Scripting
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create HTML template for tweets
const createTweetElement = function(tweet) {
  let $tweet = $(
    `<article class="tweet">
      <header class="post header">
        <div class="user">
          <img src="${escape(tweet.user.avatars)}" alt="face">
          <span class="user-name">${escape(tweet.user.name)}</span>
        </div>
        <span class="tag">${escape(tweet.user.handle)}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <hr>
      <footer class="post footer">
        <span>${escape(timeago.format(tweet.created_at))}</span>
        <div>
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
        </div>
      </footer>
    </article>`);
  return $tweet;
};

// Loop through an array of tweet objects and pass each to createTweetElement
const renderTweets = function(tweets) {
  $('#tweets-container').empty(); // Empties tweet container to prevent doubling
  for (const i of tweets) {
    let $tweet = createTweetElement(i);
    $('#tweets-container').prepend($tweet);
  }
};

$(document).ready(function() {
  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  loadTweets();

  $("#new-tweet").on("submit", function(event) { // Event handler
    event.preventDefault(); // Prevents form submission
    // Show error if empty textarea
    if ($('.tweet-text').val() === "" || $('.tweet-text').val() === null) {
      $("#too-long").slideUp("slow");
      return $('#empty').slideDown("slow");
    // Show error if too many typed characters
    } else if ($('.tweet-text').val().length > 140) {
      $("#empty").slideUp("slow");
      return $('#too-long').slideDown("slow");
    // Submit
    } else {
      $(".error-message").slideUp("slow");
      let serial = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: serial,
        success: () => {
          loadTweets();
        },
        dataType: "text"
      });
      // Empty textarea after submit
      $('textarea').val('');
    }
  });
});


