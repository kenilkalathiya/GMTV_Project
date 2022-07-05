const { default: axios } = require("axios");

require("dotenv").config();
const tmdbApiKey = process.env.TMDB_API_V3;
const tmdbURL = "https://api.themoviedb.org/";

const getTrendingMovies = async (req, res) => {
    try{
        const sendData = (tmdbRes) => {
            res.status(200).json({"trending" : tmdbRes.data});
        }

        await axios.get(tmdbURL + `3/trending/movie/day?api_key=${tmdbApiKey}`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getTrendingSeries = async (req, res) => {
    try{
        const sendData = (tmdbRes) => {
            res.status(200).json({"trending" : tmdbRes.data});
        }

        await axios.get(tmdbURL + `3/trending/tv/day?api_key=${tmdbApiKey}`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getUpcomingMovies = async (req, res) => {
    try{
        const sendData = (tmdbRes) => {
            res.status(200).json({"trending" : tmdbRes.data});
        }

        await axios.get(tmdbURL + `3/movie/upcoming?api_key=${tmdbApiKey}&page=1`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getTopratedMovies = async (req, res) => {
    try{
        const sendData = (tmdbRes) => {
            res.status(200).json({"trending" : tmdbRes.data});
        }

        await axios.get(tmdbURL + `3/movie/top_rated?api_key=${tmdbApiKey}&page=1`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getTopratedSeries = async (req, res) => {
    try{
        const sendData = (tmdbRes) => {
            res.status(200).json({"trending" : tmdbRes.data});
        }

        await axios.get(tmdbURL + `3/tv/top_rated?api_key=${tmdbApiKey}&page=1`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong" });
    }
}

const getMovie = async (req, res) => {
    try{
        const { movieID } = req.params;
        const sendData = (tmdbRes) => {
            res.status(200).json({"movie" : tmdbRes.data});
        }
        await axios.get(tmdbURL + `3/movie/${movieID}?api_key=${tmdbApiKey}`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong or Movie ID you provided does not exist." });
    }
}

const getSeries = async (req, res) => {
    try{
        const { tvID } = req.params;
        const sendData = (tmdbRes) => {
            res.status(200).json({"series" : tmdbRes.data});
        }
        await axios.get(tmdbURL + `3/tv/${tvID}?api_key=${tmdbApiKey}`)
            .then(tmdbRes => tmdbRes ? sendData(tmdbRes) : res.status(500).json({ message: "Something went wrong in TMDB api response." }));
    }
    catch(error){
        res.status(500).json({ message: "Something went wrong or Series ID you provided does not exist." });
    }
}

module.exports = { getTrendingMovies, getTrendingSeries, getUpcomingMovies, getTopratedMovies, getTopratedSeries, 
                    getMovie, getSeries }