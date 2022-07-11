import React from 'react';
// import {AiFillCloseSquare} from 'react-icons/ai';
import "../CSS/signup.css";

export default function Signup({popup, children, onpopdown}) {
    if(!popup) return null

    return (
        <div className='signup'>
            <div className="signup-inner">
                <button className='sgn-close' onClick={onpopdown}><span class="material-icons btn">close</span></button>
                { children }
            </div>
            
        </div>
    ) 
}
