var audioElement = document.createElement("audio");

var cartoonCharacters = [
  "Bugs Bunny",
  "Mickey Mouse",
  "Tweety",
  "Popeye",
  "Daffy Duck",
  "Donald Duck",
  "Goofy",
  "Mogli",
  "Yogi Bear",
  "Winnie-the-Pooh",
  "Superman",
  "Olive Oly",
  "Tom Cat",
  "Jerry Mouse",
  "Sponge Bob"
];

function displaybuttons(cartoonCharacters, classToAdd) {
  $("#buttons").empty();
  for (var i = 0; i < cartoonCharacters.length; i++) {
    var button = $("<button>");
    button.addClass(classToAdd);
    button.text(cartoonCharacters[i]);
    $("#buttons").append(button);
  }
}
$(document).on("click", ".cartoonCharacters", function() {
  var displaygif = $(this).text();

  console.log("displaygif : " + displaygif + "\n");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    displaygif +
    "&api_key=Ro3GnmGgQXHjzG3RdDqaOdIUxdDLPoO3&limit=10";
  $.ajax({
    url: queryURL,
    method: "get"
  })
    .then(function(response) {
      console.log(response);
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var gifdiv = $("<div>");
        gifdiv.addClass("gif-item");
        var rating = results[i].rating;
        var p = $("<p>");
        p.text(rating);
        animate = results[i].images.fixed_height.url;
        still = results[i].images.fixed_height_still.url;

        var gifcartoon = $("<img>");
        gifcartoon.attr("src", still);
        gifcartoon.attr("data-animate", animate);
        gifcartoon.attr("data-still", still);
        gifcartoon.attr("data-state", "still");
        gifcartoon.addClass("gifcartoon");
        gifdiv.prepend(p);

        gifdiv.prepend(gifcartoon);
        $("#gif").prepend(gifdiv);
      }
    })
    .catch(function(err) {
      console.log(err);
    });
});

$(document).on("click", ".gifcartoon", function() {
  currentstate = $(this).attr("data-state");
  console.log(currentstate);
  if (currentstate === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
    audioElement.setAttribute("src", "assets/music/laugh.mp3");
    audioElement.loop = true;
    audioElement.play();
    console.log("animate condition");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
    audioElement.pause();
  }
});

$("#submit").on("click", function() {
  var newcharacter = $("#newcharacter").val();
  cartoonCharacters.push(newcharacter);
  displaybuttons(cartoonCharacters, "cartoonCharacters");
});
displaybuttons(cartoonCharacters, "cartoonCharacters");
