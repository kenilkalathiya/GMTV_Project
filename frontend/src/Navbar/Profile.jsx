import React, { useState, useEffect } from "react";
import "../CSS/profile.css";
import img from "../Assests/profile.png";
import img2 from "../Assests/Wallpaper-1.jpg";
import axios from "axios";

export default function Profile() {
  const [resUserInfo, setResUserInfo] = useState("");
  const [trackingInfo, setTrackingInfo] = useState("");
  const id = localStorage.getItem("id");

  useEffect(() => {
    async function userAPI() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };

      await axios
        .get(
          `http://165.232.181.83:8000/user/userInfo/${localStorage.getItem(
            "id"
          )}`,
          config
        )
        .then((res) => {
          setResUserInfo(res.data.user);
          // console.log(res.data);
        });
    }
    userAPI();

    async function trackingAPI() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .get(`http://165.232.181.83:8000/user/tracking/${id}`, config)
        .then((res) => {
          setTrackingInfo(res.data.tracked_info.reverse());
          // console.log(res.data.tracked_info);
        })
        // .then(() => {
        //   console.log(trackingInfo);
        // });
    }
    trackingAPI();
  }, []);

  function submitImage(event) {
    event.preventDefault();
    // console.log(event.target[0].files[0]);
    let userImage = event.target[0].files[0];
    let formData = new FormData();
    formData.append("profileImg", userImage);
    const id = localStorage.getItem("id");

    async function imageAPI() {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      };
      await axios
        .post(
          `http://165.232.181.83:8000/user/updatePhoto/${id}`,
          formData,
          config
        )
        .then((res) => {
          setResUserInfo(res.data);
        });
    }
    imageAPI();
  }

  return (
    <>
      <div className="P-main">
        <div className="profile-image">
          {resUserInfo ? (
            <img
              className="pimage"
              src={
                resUserInfo.profilePhoto &&
                resUserInfo.profilePhoto.length !== 0
                  ? `data:${resUserInfo.profilePhoto.contentType};base64,${resUserInfo.profilePhoto.data}`
                  : img
              }
              alt="Profile Image"
            />
          ) : (
            "Loading"
          )}
          <form onSubmit={submitImage} encType="multipart/form-data">
            <input type="file" id="user-file" name="user-file"></input>
            <button className="submit-image" type="submit" value="submit">
              Submit
            </button>
          </form>
        </div>
        <div className="user-info">
          <div className="user-name">
            <div className="first">
              <h3 className="lable">First Name</h3>
              <h2 className="lable-info">
                {resUserInfo ? resUserInfo.first_name : "Loading..."}
              </h2>
            </div>

            <div className="last">
              <h3 className="lable">Last Name</h3>
              <h2 className="lable-info">
                {resUserInfo ? resUserInfo.last_name : "Loading..."}
              </h2>
            </div>
          </div>

          <h3 className="lable">Email</h3>
          <h2 className="lable-info">
            {resUserInfo ? resUserInfo.email : "Loading..."}
          </h2>
        </div>
      </div>
      {/* <hr className="Hrline"></hr> */}
      <div className="user-msdata">
        {trackingInfo?
        trackingInfo.map((data, index) => {
          return (
            <>
              {data.media_type === "movie" ? (
                <div className="user-movie">
                  <img
                    className="user-ms-poster"
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    alt="movie photo"
                  />
                </div>
              ) : (
                <div className="user-series">
                  <img
                    className="user-ms-poster"
                    src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
                    alt="movie photo"
                  />
                  <div className="watched-info">
                    <h5 className="ms_info">Current Season : {data.seasons}</h5>
                    <h5 className="ms_info">Cureent Episodes : {data.last_seasons_episodes}</h5>
                  </div>
                </div>
              )}
            </>
          );
        }):
        "loading"
        }
      </div>
    </>
  );
}
