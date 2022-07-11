import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import img from "../Assests/profile.png";
import axios from "axios";
import "../CSS/dropdown.css";

export default function Dropdown() {
    const [down, setDown] = useState(false);
    const [resUserInfo, setResUserInfo] = useState("");

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
          });
      }
      userAPI();
    }, []);

    const showdown = ()=> {
        setDown(true);
    }

    const hidedown = ()=> {
        setDown(false);
    }

    function logout(){
        localStorage.clear();
        window.location.reload()
    }

    // console.log(userId);

  return (
    <div>
      <div className="profile" onMouseEnter={showdown} onMouseLeave={hidedown}>
        {(resUserInfo)?<img className="profile" src={
              resUserInfo.profilePhoto && resUserInfo.profilePhoto.length !== 0
                ? `data:${
                    resUserInfo.profilePhoto.contentType
                  };base64,${
                    resUserInfo.profilePhoto.data
                  }`
                : img
            } alt="Profile" />
            :
            "Loading"

        }
        
      
      {(down) ? 
      <>
      <div className="list" onMouseEnter={showdown}>
          <ul>
            {/* <li> */}

              <NavLink to="/profile">
                <li>Profile</li>
                </NavLink>
            {/* </li> */}
            <hr />

            
                <NavLink to="/" onClick={logout}><li>Log Out</li></NavLink>
                
              {/* <Link to={"/"}>Log Out</Link> */}
            
          </ul>
        </div>
        </>
         : 
        null}
      
        </div>
    </div>
  );
}
