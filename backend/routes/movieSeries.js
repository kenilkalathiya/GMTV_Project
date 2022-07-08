const express = require("express");
const router = express.Router();
const { getTrendingMovies, getUpcomingMovies, getTrendingSeries, 
    getTopratedMovies, getTopratedSeries, getMovie, getSeries, searchMovieSeries } = require("../controllers/moviesSeries");


router.get("/movies/trending", getTrendingMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/top-rated", getTopratedMovies);
router.get("/movies/getmovie/:movieID", getMovie);
router.get("/series/trending", getTrendingSeries);
router.get("/series/top-rated", getTopratedSeries);
router.get("/series/getseries/:tvID", getSeries);
router.get("/search/:query", searchMovieSeries);

module.exports = router;