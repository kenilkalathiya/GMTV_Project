import React, { useState } from "react";
import axios from "axios";
// import "./CSS/login.css";
import "../CSS/addMs.css";

export default function AddMs({ open, onClose, seasons, media_type, msID, Image_path, sverify, setSverify }) {
  // const [IsActive, setIsActive] = useState(false);

  const [episodes, setEpisodes] = useState(0);
  const [season, setSeasons] = useState(0);
  const userID = localStorage.getItem("id");
  let addedDate = new Date().toISOString().slice(0, 10);

  function getSeason(e) {
    let clikSeason = e.target.innerText;
    setSeasons(clikSeason);
    // console.log(season, e.target);
  }
  function closeAdd(){
    onClose();
  }

  async function addMsAPI() {
    const config = {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    };

    let AddItem = {
      'userID': userID,
      'msID': msID,
      'media_type': media_type,
      'addedDate': addedDate,
      'seasons': parseInt(season),
      'last_seasons_episodes': parseInt(episodes),
      'backdrop_path':Image_path
    };
    // console.log(AddItem);
    await axios
      .post(
        `http://165.232.181.83:8000/user/tracking/${userID}`, AddItem, config
      )
      .then((res) =>
        res.status ===200
          ? // ? console.log(res.data.existingUser._id)
            setSverify(true)
          : setSverify(false)
      );
    }
    // addMsAPI();

  // console.log(episode);
  if (!open) return null;
  return (
    <div className="popupMs">
      <div className="popup-innerMs">
        <button className="btn-close" onClick={onClose}>
          <span class="material-icons btn">close</span>
        </button>
        <div className="Ms_container">
          {/* <h2>Movie Name</h2>
          <input
            className="MsInput"
            type="text"
            placeholder="Enter Movie Name"
          ></input> */}
          <h2>Season</h2>
          <div className="season">
            {seasons
              ? seasons.map((seas, index) => {
                  return (
                    <div className="SeasonCircle" onClick={getSeason}>
                      {index + 1}
                    </div>
                  );
                })
              : "Loading"}
          </div>
          <h2>Episode</h2>
          <input type="number" onChange={(e) => setEpisodes(e.target.value)} />
          <br />
          <button id="loginBtn" type="button" onClick={()=>{addMsAPI(); closeAdd();}}>
            Add To DataBase
          </button>
        </div>
      </div>
    </div>
  );
}
