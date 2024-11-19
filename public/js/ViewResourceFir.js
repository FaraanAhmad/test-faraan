function searchMovies() {

    var id = document.getElementById("searchField").value

    if (id.length == 0) {
        alert("Search field required");
        return;
      }
  
      else if (id.length < 2) {
          alert("Search field should be at least 2 characters" );
          return;
        }
    var response = "";
    var request = new XMLHttpRequest();
    request.open("GET", "/view-resource/" + id, true);
    request.setRequestHeader("Content-Type", "application/json");
    request.onload = function () {
      response = JSON.parse(request.responseText);
      var html = "";
      for (var i = 0; i < response.length; i++) {
        html +=
          "<tr>" +
          "<td>" +
          (i + 1) +
          "</td>" +
          "<td>" +
          response[i].movieTitle +
          "</td>" +
          "<td>" +
          response[i].movieImage +
          "</td>" +
          "<td>" +
          response[i].movieDescription +
          "</td>" +
          "<td>" +
          response[i].movieDirectors +
          "</td>" +
          "</tr>";
      }
      document.getElementById("tableContent").innerHTML = html;
    };
    request.send();
  }