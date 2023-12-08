console.log("hello");

let count = 140;

$(document).ready(function () {
  $("#tweet-text").on('input', function () {
    
    let counter = count - ($("#tweet-text").val().length)
    $(this).parents()[0][2].textContent=counter
  });
});

