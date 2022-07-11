import React, { useState } from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";
import "../CSS/searchBar.css";

export default function SearchBar() {
  const [filterData, setFilterData] = useState([]);
  const [wordInput, setWordInput] = useState("");

  const handleFilter = (event) => {

    const searchWord = event.target.value;
    setWordInput(searchWord);

    async function searchAPI() {
      // let lgnItem = { email, password };
      await axios
        .get(`http://165.232.181.83:8000/moviesSeries/search/${searchWord}`)
        .then((res)=>{
          console.log(res.data);
          setFilterData(res.data.results);
          
          
        })
      }
      searchAPI()

      if(searchWord === ""){
              setFilterData([]);
          }
  

}
    function clearData(){
        setFilterData([]);
        setWordInput("");
    }

  return (
    <>
      <div className="search">
        <div className="search-input">
          <input type="text" placeholder="Search here" value={wordInput} onInput={handleFilter} />
            {(filterData.length === 0) ?
            <span class="material-symbols-outlined searchBtn">search</span> 
            :
            <span class="material-symbols-outlined close-btn" onClick={clearData}>close</span>
            }
        </div>
        {filterData.length !== 0 && (
          <div className="search-result">
            {filterData.slice(0, 15).map((name, index) => {
              return (
                <>
                  {
                  (name.media_type==='movie' || name.media_type==='tv')?
                  (name.media_type==='movie')?
                  <div className="lists">
                  <NavLink to={`/ms/${name.media_type}/${name.id}`}>
                  <p className="searchedTitle">{name.title}</p>
                  </NavLink>
                  </div>
                  :
                  <div className="lists">
                    <NavLink to={`/ms/${name.media_type}/${name.id}`}>

                  <p className="searchedTitle">{name.name}</p>
                    </NavLink>
                  </div>
                  :""
                  }
                  </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
