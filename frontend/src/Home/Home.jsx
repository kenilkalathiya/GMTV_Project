import React, { useEffect, useState } from "react";
import axios from "axios";
import Poster from "./Poster";
import Row from "./Row";
import "../CSS/home.css";
import Footer from "./Footer";

export default function Home() {
  const [randomnum, setRandomnum] = useState(Math.floor(Math.random() * 10));
  const [upcomingMovie, setupcomingMovie] = useState(null);
  const [trendMovie, settrendMovie] = useState(null);
  const [trendSeries, settrendSeries] = useState(null);
  const [topRatedMovie, settopRatedMovie] = useState(null);
  const [topRatedSeries, settopRatedSeries] = useState(null);
  useEffect(() => {
    async function api() {
      await axios
        .get("http://165.232.181.83:8000/moviesSeries/movies/upcoming")
        .then((res) => {
          res.data
            ? setupcomingMovie(res.data.trending.results)
            : setupcomingMovie(null);
          // console.log(res.data.trending.results);
        });
      await axios
        .get("http://165.232.181.83:8000/moviesSeries/movies/trending")
        .then((res) => {
          res.data
            ? settrendMovie(res.data.trending.results)
            : settrendMovie(null);
          // console.log(res.data.trending.results)
        });
      await axios
        .get("http://165.232.181.83:8000/moviesSeries/series/trending")
        .then((res) => {
          res.data
            ? settrendSeries(res.data.trending.results)
            : settrendSeries(null);
          // console.log(res.data.trending.results)
        });
      await axios
        .get("http://165.232.181.83:8000/moviesSeries/movies/top-rated")
        .then((res) => {
          res.data
            ? settopRatedMovie(res.data.trending.results)
            : settopRatedMovie(null);
          // console.log(res.data.trending.results);
        });
      await axios
        .get("http://165.232.181.83:8000/moviesSeries/series/top-rated")
        .then((res) => {
          res.data
            ? settopRatedSeries(res.data.trending.results)
            : settopRatedSeries(null);
          // console.log(res.data.trending.results)
        });
    }
    api();
  }, []);
  return (
    <div className="main">
      {upcomingMovie && randomnum ? (
        <>
          <Poster
            name={upcomingMovie[randomnum].title}
            image={upcomingMovie[randomnum].backdrop_path}
            description={upcomingMovie[randomnum].overview}
            rating={upcomingMovie[randomnum].vote_average}
          />

          {/* <Row title = "GMTV Originals" isLargeRow = {true}/> */}
          <Row
            title="Upcoming"
            data={upcomingMovie}
            image={upcomingMovie.poster_path}
            isLarge={true}
            media_type ="movie"
          />
          <Row title="Trending Movies" data={trendMovie} media_type ="movie"/>
          <Row title="Trending Series" data={trendSeries} media_type ="tv"/>
          <Row title="Top-Rated Movies" data={topRatedMovie} media_type ="movie"/>
          <Row title="Top-Rated Series" data={topRatedSeries} media_type ="tv"/>
          <Footer/>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
