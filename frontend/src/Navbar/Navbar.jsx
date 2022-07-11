import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import axios from "axios";
import SearchBar from "./SearchBar";
import Login from "./Login";
import Signup from "./Signup";
import Dropdown from "./Dropdown";
import "../CSS/navbar.css";
import "../CSS/login.css";
import Data from "../Data.json";

export default function Navbar() {
  const [show, handleShow] = useState(false);
  const [restoken, setRestoken] = useState(false);
  const [resUserInfo, setResUserInfo] = useState("");

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });

    if (localStorage.getItem("token")) {
      setRestoken(true);
    } else {
      setRestoken(false);
    }

    return () => {
      window.removeEventListener("scroll");
    };

  }, []);

  const [login, setlogin] = useState(false);
  const [signup, setsignup] = useState(false);
  // const [recdata, setRecdata] = useState(null);

  // login *****************


  function resData(res){
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("id",res.data.existingUser._id);

  }
  function resSignupData(res){
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("id",res.data.result._id);

  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginAPI() {
    let lgnItem = { email, password };
    await axios
      .post("http://165.232.181.83:8000/loginSignup/login", lgnItem)
      .then((res) =>
        res
          // ? console.log(res.data.existingUser._id)
          ? resData(res)
          : console.log("no data")
      )
      .then(() => {
        if (localStorage.getItem("token")) {
          setlogin(false);
          setRestoken(true);
        }
      });
  }

  // Sign up ****************

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [sgnemail, setSgnemail] = useState("");
  const [sgnpass, setSgnpass] = useState("");

  async function signupAPI() {
    let sgnItem = { first_name: name,last_name:surname, email: sgnemail, password: sgnpass };
    await axios
      .post("http://165.232.181.83:8000/loginSignup/signup", sgnItem)
      .then((res) =>
        res
          ? resSignupData(res)
          : console.log("no data")
      )
      .then(() => {
        if (localStorage.getItem("token")) {
          setsignup(false);
          setRestoken(true);
        }
      });
  }

  return (
    <>
      <div className={`nav ${show && "nav__black"}`}>
        <div className="nav_logo"></div>
        <SearchBar/>

        <div className="rightnav">
          {restoken ? (
            <Dropdown />
          ) 
          : (
            <>
            <div>
              <button
                className="nav_login"
                onClick={() => {
                  setlogin(true);
                }}
              >
                Sign In
              </button>

              <button
                className="nav_signup"
                onClick={() => {
                  setsignup(true);
                }}
              >
                Sign Up
              </button>
            </div>
            </>
          )}
        </div>
        <Login open={login} onClose={() => setlogin(false)}>
          <form className="loginMain">
            <div className="container">Sign In</div>
            <div class="inputbox">
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                name=""
                placeholder="Enter Email"
                required
              />
            </div>

            <div class="inputbox">
              <input
                id="password"
                type="Password"
                onChange={(e) => setPassword(e.target.value)}
                name=""
                placeholder="Enter Password"
                required
              />
            </div>
            <div class="inputbox">
              <button id="loginBtn" type="button" onClick={loginAPI}>
                Login
              </button>
            </div>
          </form>
        </Login>

        <Signup popup={signup} onpopdown={() => setsignup(false)}>
          <form className="main">
            <div className="container">Sign Up</div>
            <div class="inputbox1">
              <div class="first">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter Name"
                  required
                />
              </div>
              <div class="last">
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  placeholder="Enter Surname"
                  required
                />
              </div>
            </div>

            <div class="sinputbox">
              <input
                type="email"
                value={sgnemail}
                onChange={(e) => setSgnemail(e.target.value)}
                placeholder="Enter E-mail"
                required
              />
            </div>
            <div class="sinputbox">
              <input
                type="password"
                id="password"
                value={sgnpass}
                onChange={(e) => setSgnpass(e.target.value)}
                name=""
                placeholder="Enter Password"
                required
              />
            </div>
            <br />

            <div class="sinputbox">
              
                <button onClick={signupAPI} id="sgnBtn" type="button">
                  Sign Up
                </button>
              
            </div>
          </form>
        </Signup>
      </div>
    </>
  );
}
