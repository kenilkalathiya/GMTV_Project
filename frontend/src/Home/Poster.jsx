import React from "react";
import "../CSS/poster.css";
import { CircularProgressbar,buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
// import Data from "./Data";



export default function Poster({name, image, description, rating,lang,time,genres}){

    return(
        <>
        <header className = "banner"
        style={{
            backgroundSize: "cover",
            backgroundImage:`url("https://image.tmdb.org/t/p/original${image}")`,
            backgroundPosition: "top center"
        }}
        >

            <div className = "banner__contents">
                <h1 className = "banner__title">
                    {name}
                </h1>

                
                <div className="rateButton">
                <CircularProgressbar styles={buildStyles({
          textColor: "white",
          pathColor: "lime",
          trailColor: "grey"
        })} className="rating" value={rating*10} text={`${rating*10}%`} />
                <h4>User Rating</h4>
                </div>
                
                    <h1 className = "banner__description">
                        {description.length > 400 ? (
                            <>
                            {description.slice(0,400)}...
                            </>
                        ):(
                            <>
                            
                            {description}
                            </>
                        )
                }
                {/* {description} */}
                </h1>
            </div>
            <div className = "banner__fadeBottom" ></div>
        </header>
        </>
    )
}