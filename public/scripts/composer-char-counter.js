// jQuery counter for tweeter

$(document).ready(function() {
  $("#tweet-text").on('input', function() {
    const counter = 140 - ($("#tweet-text").val().length); // Count minus how many characters
    $(this).parents()[0][2].textContent = counter;
    if (counter < 0) { // Counter turns red if negative
      $(this).parents()[0][2].className = "negative";
    } else {
      $(this).parents()[0][2].className = "counter";
    }
  });
});


