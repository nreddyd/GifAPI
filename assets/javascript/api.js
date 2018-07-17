var animals = ["dog", "cat", "rat", "tiger", "lion"];

function displaybuttons(animals) {
  $("#buttons").empty();
  for (var i = 0; i < animals.length; i++) {
    var button = $("<button>");
    button.attr("data-name", animals[i]);
    button.addClass("animals");
    button.text(animals[i]);
    $("#buttons").append(button);
  }

  $(".animals").on("click", function() {
    var displaygif = $(this).attr("data-name");
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
          var gifanimal = $("<img>");
          gifanimal.attr("src", results[i].images.fixed_width.url);
          $("#gif").prepend(gifanimal);
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  });
}

$("#submit").on("click", function() {
  var newanimal = $("#newanimal").val();
  console.log("newanimal", newanimal);
  animals.push(newanimal);
  console.log(animals);
  displaybuttons(animals);
});
displaybuttons(animals);
