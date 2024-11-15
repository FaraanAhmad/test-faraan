function editMovie() {
    var selectedMovie = document.getElementById("movieIdInput").value;

    document.getElementById("updateButton").setAttribute("onclick", 'updateMovie("' + selectedMovie + '")');

    $('#editMovieModal').modal('show'); 
}

function updateMovie(id) {
    console.log(id)
    var response = "";

    var jsonData = new Object();
    jsonData.movieImage = document.getElementById("editImage").value;
    jsonData.movieTitle = document.getElementById("editTitle").value;
    jsonData.movieDescription = document.getElementById("editDescription").value;
    jsonData.movieDirectors = document.getElementById("editDirector").value;
    jsonData.movieWriters = document.getElementById("editWriter").value;
    jsonData.movieStars = document.getElementById("editStar").value;


    if (jsonData.movieImage == "" || jsonData.movieTitle == "" || jsonData.movieDescription == ""  || jsonData.movieDirectors == "" || jsonData.movieWriters == "" || jsonData.movieStars == "") {
        document.getElementById("editMessage").innerHTML = 'All fields are required!';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }
    else if (jsonData.movieTitle.trim().length === 0) {
        document.getElementById("editMessage").innerHTML = 'Movie title cannot be just whitespace.';
        document.getElementById("editMessage").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("PUT", "/edit-movie/" + id, true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
console.log(response)
        if (response.message == "Movie modified successfully!") {
            document.getElementById("editMessage").innerHTML = 'Edited Movie: ' + jsonData.movieTitle + '!';
            document.getElementById("editMessage").setAttribute("class", "text-success");
            window.location.href = 'index.html';
        }
        else {
            document.getElementById("editMessage").innerHTML = 'Unable to edit movie!';
            document.getElementById("editMessage").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}