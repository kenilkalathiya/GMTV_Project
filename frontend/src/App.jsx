import React, {useEffect} from "react";
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
  import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Profile from "./Navbar/Profile";
import Ms from "./Movie and Series/Ms";
import "./CSS/App.css";

export default function App() {

  useEffect(() => {
    async function userAPI(){
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    };

      await axios.get(`http://165.232.181.83:8000/user/userInfo/${localStorage.getItem('id')}`,config)
      // .then((res) =>{
      //   console.log(res.data.user)
      // });
    }
    userAPI()
  },[])
  return (
    <>

      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile  />} />
          <Route path="/ms/:media_type/:id" element={<Ms />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
