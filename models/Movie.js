class Movie {
    constructor(movieImage, movieTitle, movieDescription, movieDirectors, movieWriters, movieStars) {
        this.movieImage = movieImage;
        this.movieTitle = movieTitle;
        this.movieDescription = movieDescription;
        this.movieDirectors = movieDirectors;
        this.movieWriters = movieWriters;
        this.movieStars = movieStars;

        const timestamp = new Date().getTime(); 
        const random = Math.floor(Math.random() * 1000);
        this.id = timestamp + "" + random.toString().padStart(3, '0');
    }
}
module.exports = { Movie };