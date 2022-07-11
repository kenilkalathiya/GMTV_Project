import React from "react";
import { NavLink } from "react-router-dom";
// import movieLink from "./Movie";
import "../CSS/row.css";

export default function Row({ title, data, isLarge,media_type }) {
  // function moviePage(){
  //   console.log("hello");
  //   <Navigate exact to="/movie" replace={true} />
  // }

  return (
    <>
      <div className="row">
        <h2>{title}</h2>
        <div className="row_posters">
          {data
            ? data.map((movie) => {
                return (
                  <div className="image">
                    <NavLink to={`/ms/${media_type}/${movie.id}`}>
                      <img
                        className={`row_poster ${isLarge && "row_posterLarge"}`}
                        src={`https://image.tmdb.org/t/p/original${
                          isLarge ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                      />
                    </NavLink>
                  </div>
                );
              })
            : "Loading"}
        </div>
      </div>
    </>
  );
}
