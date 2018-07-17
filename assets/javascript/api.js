var animals = ["dog", "cat", "rat", "tiger", "lion"];

for (var i = 0; i < animals.length; i++) {
  var button = $("<button>");
  button.attr("data-name", animals[i]);
  button.addClass("animals");
  button.text(animals[i]);
  $("#buttons").append(button);
}

$.ajax({
  url:
    "https://api.giphy.com/v1/gifs/search?q=dog&api_key=Ro3GnmGgQXHjzG3RdDqaOdIUxdDLPoO3&limit=10",
  method: "get"
})
  .then(function(response) {
    console.log(response);
  })
  .catch(function(err) {
    console.log(err);
  });
