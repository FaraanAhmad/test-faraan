function addMovie() {
    var response = "";

    var jsonData = new Object();
    jsonData.movieImage = document.getElementById("movieImage").value;
    jsonData.movieTitle = document.getElementById("movieTitle").value;
    jsonData.movieDescription = document.getElementById("movieDescription").value;
    jsonData.movieDirectors = document.getElementById("movieDirectors").value;
    jsonData.movieWriters = document.getElementById("movieWriters").value;
    jsonData.movieStars = document.getElementById("movieStars").value;

    

    if (jsonData.movieImage == "" || jsonData.movieTitle == "" || jsonData.movieDescription == "" || jsonData.movieDirectors == "" || jsonData.movieWriters == "" || jsonData.movieStars == "") {
        document.getElementById("message").innerHTML = 'All fields are required!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }
    else if (jsonData.movieDescription < 6) {
        document.getElementById("message").innerHTML = 'Description too short!';
        document.getElementById("message").setAttribute("class", "text-danger");
        return;
    }

    var request = new XMLHttpRequest();

    request.open("POST", "/add-resource", true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onload = function () {
        response = JSON.parse(request.responseText);
        console.log(response)
        if (response.message == undefined) {
            document.getElementById("message").innerHTML = 'Added Movie: ' + jsonData.movieTitle + '!';
            document.getElementById("message").setAttribute("class", "text-success");

            document.getElementById("movieImage").value = "";
            document.getElementById("movieTitle").value = "";
            document.getElementById("movieDescription").value = "";
            document.getElementById("movieDirectors").value = "";
            document.getElementById("movieWriters").value = "";
            document.getElementById("movieStars").value = "";

            window.location.href = 'index.html';
        }
        else {
            document.getElementById("message").innerHTML = 'Unable to add movie!';           
            document.getElementById("message").setAttribute("class", "text-danger");
        }
    };

    request.send(JSON.stringify(jsonData));
}
