const { Movie } = require('../models/Movie');
const fs = require('fs').promises;

async function readJSON(filename) {
    try {
        const data = await fs.readFile(filename, 'utf8');
        return JSON.parse(data);
    } catch (err) { console.error(err); throw err; }
}

async function writeJSON(object, filename) {
    try {
        const allObjects = await readJSON(filename);
        allObjects.push(object);

        await fs.writeFile(filename, JSON.stringify(allObjects), 'utf8');
        return allObjects;
    } catch (err) { console.error(err); throw err; }
}

async function addMovie(req, res) {
    try {
        const movieImage = req.body.movieImage;
        const movieTitle = req.body.movieTitle;
        const movieDescription = req.body.movieDescription;
        const movieDirectors = req.body.movieDirectors;
        const movieWriters = req.body.movieWriters;
        const movieStars = req.body.movieStars;

        if (movieImage.length == 0 || movieTitle.length == 0 || movieDescription.length == 0 || movieDirectors.length == 0 || movieWriters.length == 0 || movieStars.length == 0) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        else if (movieDescription.length < 6) {
            return res.status(500).json({ message: 'description too short' });
        }
        else {
            const newResource = new Movie(movieImage, movieTitle, movieDescription, movieDirectors, movieWriters, movieStars);
            const updatedResources = await writeJSON(newResource, 'utils/movies.json');
            return res.status(201).json(updatedResources);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

async function editMovie(req, res) {
    try {
        const id = req.params.id;
        const movieImage = req.body.movieImage;
        const movieTitle = req.body.movieTitle;
        const moviedescription = req.body.movieDescription;
        const moviedirectors = req.body.movieDirectors;
        const moviewriters = req.body.movieWriters;
        const moviestars = req.body.movieStars;

        const allMovies = await readJSON('utils/movies.json');

        var modified = false;

        for (var i = 0; i < allMovies.length; i++) {
            var curcurrResource = allMovies[i];
            if (curcurrResource.id == id) {
                allMovies[i].movieImage = movieImage;
                allMovies[i].movieTitle = movieTitle;
                allMovies[i].movieDescription = moviedescription;
                allMovies[i].movieDirectors = moviedirectors;
                allMovies[i].movieWriters = moviewriters;
                allMovies[i].movieStars = moviestars;

                modified = true;
            }
        }

        if (!movieTitle) {
            return res.status(500).json({ message: 'The movie title must be filled' });
        }
        else if (typeof movieTitle !== 'string') {
            return res.status(500).json({ message: 'The movie title must be a string' });
        }
        else if (movieTitle.trim().length === 0) {
            return res.status(500).json({ message: 'The movie title must not be empty' });
        }
        else if (modified) {
            await fs.writeFile('utils/movies.json', JSON.stringify(allMovies), 'utf8');
            return res.status(201).json({ message: 'Movie modified successfully!' });
        } else {
            return res.status(500).json({ message: 'Error occurred, unable to modify!' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



module.exports = {
    readJSON, writeJSON, addMovie, editMovie
};