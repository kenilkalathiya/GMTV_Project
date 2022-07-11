import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../CSS/ms.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import AddMs from "../Movie and Series/AddMs";

export default function Ms() {
  const [add, setAdd] = useState(false);
  const [getM, setGetM] = useState(null);
  const [mverify, setMverify] = useState(false);
  const [sverify, setSverify] = useState(false);
  const { media_type, id } = useParams();
  const userID = localStorage.getItem("id");
  let addedDate = new Date().toISOString().slice(0, 10);
  // let MImage_path = getM.movie.poster_path;
  // const [Mepisode, seteMpisode] = useState(0);
  // const [Mseason, setMseasons] = useState(0);

  useEffect(() => {
    let msPath = "";
    if (media_type === "movie") {
      msPath = `/movies/getmovie/${id}`;
    } else {
      msPath = `/series/getseries/${id}`;
    }
    async function msAPI() {
      await axios
        .get(`http://165.232.181.83:8000/moviesSeries${msPath}`)
        .then((res) => {
          res.data
            ? setGetM(res.data)
            : // ? console.log(res.data)
              setGetM(null);
          // console.log(res.data);
        });
    }
    msAPI();

    function sverification(res){
      if(res.data.tracked && media_type==='movie'){
        setMverify(true)
      }
      else if(res.data.tracked && media_type==='tv'){
        setSverify(true)
      }
      else{
        setMverify(false)
        setSverify(false)
      }
    }

    async function verifyAPI() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(
          `http://165.232.181.83:8000/user/checkTracking/${userID}/${id}`,
          config
        )
        .then((res) => {
          res.status ===200 ?
           sverification(res):  console.log()
        });
    }
    verifyAPI();

  
    // console.log(verify)
  }, []);

  async function addMsAPI() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    let AddItem = {
      userID: userID,
      msID: id,
      media_type: media_type,
      addedDate: addedDate,
      seasons: 0,
      last_seasons_episodes: 0,
      backdrop_path: getM.movie.poster_path,
    };
    // console.log(AddItem);
    await axios
      .post(
        `http://165.232.181.83:8000/user/tracking/${userID}`,
        AddItem,
        config
      )
      .then((res) => (res ? setMverify(true) : setMverify(false)));
  }

  // function addBtn() {}

  function countHours(time) {
    var Hours = Math.floor(time / 60);
    var minutes = time % 60;
    return `${Hours}hr ${minutes}min`;
  }

  return (
    <>
      {getM && media_type === "movie" ? (
        <div
          className="ms-container"
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original${getM.movie.backdrop_path}")`,
          }}
        >
          <div className="ms-image">
            <img
              className="ms-image-poster"
              src={`https://image.tmdb.org/t/p/original${getM.movie.poster_path}`}
              alt={getM.movie.title}
            />
          </div>

          <div className="ms-info">
            <h1>{getM.movie.title}</h1>
            <p className="small_info">
              {getM.movie.original_language.toUpperCase()} •{" "}
              {countHours(getM.movie.runtime)} •{" "}
              {getM.movie.genres.map((gen, index) => {
                let temp = "";
                if (index + 1 !== getM.movie.genres.length) {
                  temp = temp + gen.name + ", ";
                } else {
                  temp = temp + gen.name;
                }
                return temp;
              })}
            </p>
            <div className="rateButton">
              <CircularProgressbar
                styles={buildStyles({
                  textColor: "white",
                  pathColor: "lime",
                  trailColor: "grey",
                })}
                value={getM.movie.vote_average * 10}
                text={`${getM.movie.vote_average * 10}%`}
              />
              <h4>User Rating</h4>

              <button className="watchList" title="Add to Watched">
                {/* {console.log(verify)} */}
                {
                  mverify ? (
                    <p className="watched">Already Wacthed !!</p>
                  ) : (
                    <span
                      class="material-symbols-outlined addBtn"
                      onClick={() => {
                        setAdd(true);
                        addMsAPI();
                      }}
                    >
                      check_box
                    </span>
                  )
                  // null
                }
              </button>
              {/* <AddMs open={add} onClose={() => setAdd(false)} /> */}
            </div>
            <div className="overview">
              <h2>Overview</h2>
              {getM.movie.overview}
            </div>
            {/* <div className="creator">
          <h2>Creators</h2>
        </div> */}
          </div>
        </div>
      ) : (
        <></>
      )}

      {getM && media_type === "tv" ? (
        <>
          <div
            className="ms-container"
            style={{
              backgroundImage: `url("https://image.tmdb.org/t/p/original${getM.series.backdrop_path}")`,
            }}
          >
            <div className="ms-image">
              <img
                className="ms-image-poster"
                src={`https://image.tmdb.org/t/p/original${getM.series.poster_path}`}
                alt={getM.series.name}
              />
            </div>

            <div className="ms-info">
              <h1>{getM.series.name}</h1>
              <p>
                {getM.series.original_language.toUpperCase()} •{" "}
                {getM.series.genres.map((gen, index) => {
                  let temp = "";
                  if (index + 1 !== getM.series.genres.length) {
                    temp = temp + gen.name + ", ";
                  } else {
                    temp = temp + gen.name;
                  }
                  return temp;
                })}
              </p>
              <div className="rateButton">
                <CircularProgressbar
                  styles={buildStyles({
                    textColor: "white",
                    pathColor: "lime",
                    trailColor: "grey",
                  })}
                  value={getM.series.vote_average * 10}
                  text={`${getM.series.vote_average * 10}%`}
                />
                <h4>User Rating</h4>

                <button className="watchList" title="Add to Watched">
                  {sverify ? (
                    <p className="watched">Already Wacthed !!</p>
                  ) : (
                    <span
                      class="material-symbols-outlined addBtn"
                      onClick={() => {
                        setAdd(true);
                      }}
                    >
                      add_box
                    </span>
                  )}
                </button>
                <AddMs
                  media_type={media_type}
                  msID={id}
                  sverify = {sverify}
                  setSverify={(p)=>{return setSverify(p)}}
                  Image_path={getM.series.poster_path}
                  open={add}
                  onClose={() => setAdd(false)}
                  seasons={getM.series.seasons}
                />
              </div>
              <div className="overview">
                <h2>Overview</h2>
                {getM.series.overview}
              </div>
              <div className="totalSeason">
                Total Season : {getM.series.seasons.length}
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
