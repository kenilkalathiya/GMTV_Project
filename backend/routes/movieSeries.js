const express = require("express");
const router = express.Router();
const { getTrendingMovies, getUpcomingMovies, getTrendingSeries, getTopratedMovies, getTopratedSeries } = require("../controllers/moviesSeries");


router.get("/movies/trending", getTrendingMovies);
router.get("/movies/upcoming", getUpcomingMovies);
router.get("/movies/top-rated", getTopratedMovies);
router.get("/series/trending", getTrendingSeries);
router.get("/series/top-rated", getTopratedSeries);

module.exports = router;