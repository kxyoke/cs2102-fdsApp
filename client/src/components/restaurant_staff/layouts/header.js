import React, {useState}from 'react'
import { Link,Redirect } from 'react-router-dom'
import axios from 'axios';
import LogoutButton from "../../logoutButton";

function Header() {

    return (
        <div class = "sticky-top" >
        <header style={headerStyle}>
            <h1>Food Delivery System</h1>
            <div class="d-flex justify-content-center"> 
                <div class="d-flex h-100"> 
                <div class ="align-self-center mx-auto" >
                <Link style={linkStyle} to='/restaurant/'>Home</Link> | <Link style={linkStyle}
                to='/restaurant/profile'>My Profile</Link> | <Link style={linkStyle}
                to='/restaurant/reviews'>My Reviews</Link> | <Link style={linkStyle}
                to='/restaurant/promos'>My Promos</Link> 
             </div> 
             <div class="d-flex justify-content-end">
                <LogoutButton/>
             </div>
            
        
            
        </div> 
        </div>
        </header>
        </div>
    )
}

const headerStyle = {
    background:"#333",
    color:'#fff',
    textAlign:'center',
    padding:'10px'
}

const linkStyle = {
    color:'#fff',
    textDecoration:'none'
}

export default Header

