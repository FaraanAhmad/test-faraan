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
            return res.status(500).json({ message: 'Description too short!' });
        }
        else {
            const newResource = new Movie(movieImage, movieTitle, movieDescription, movieDirectors,movieWriters,movieStars);
            const updatedResources = await writeJSON(newResource, 'utils/movies.json');
            return res.status(201).json(updatedResources);
        }

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}



module.exports = {
    readJSON, writeJSON, addMovie
};