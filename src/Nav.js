import React, { useState } from 'react'
import { useEffect } from 'react'
import './netflix-logo.png'

function Nav() {
    const [show,handleShow]=useState(false);
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY>100){
                handleShow(true);
            }else{
                handleShow(false);
            }
        });
        return()=>{
            window.removeEventListener("scroll")
        };
    },[])

    return (
        <div className={`nav${show && "nav__black"}`}>
            
        </div>
    )
}

export default Nav
