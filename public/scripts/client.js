// Tweeter client

// Prevent Cross-Site Scripting
const escape = function(str) {
  const div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// Create HTML template for tweets
const createTweetElement = function(tweet) {
  const $tweet = $(
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
    const $tweet = createTweetElement(i);
    $('#tweets-container').prepend($tweet);
  }
};

$(document).ready(function() {

  // Toggle button
  $("#write").on("click", function() {
    $(".new-tweet").toggle("slow");
    $('textarea').focus();
  });

  // Scroll up button
  $(document).on("scroll", function() {
    if ($(this).scrollTop() > 0) {
      $(".up").fadeIn("fast");
    } else {
      $(".up").fadeOut("fast");
    }
  })

  $(".up").on("click", function() {
    $("html, body").animate({ scrollTop: 0 }, "slow"); 
  
  });


  const loadTweets = function() {
    $.ajax('http://localhost:8080/tweets', { method: 'GET' })
      .then(function(tweets) {
        renderTweets(tweets);
      });
  };

  loadTweets();

  //Show new tweets
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
      const serial = $(this).serialize();
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/tweets",
        data: serial,
        success: () => {
          loadTweets();
        },
        dataType: "text"
      });
      // Empty textarea after submit and reset counter
      $('textarea').val('');
      $("#tweet-text").parents()[0][2].textContent = 140;
    }
  });
});


