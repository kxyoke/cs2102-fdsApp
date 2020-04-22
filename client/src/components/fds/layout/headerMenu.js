import React, {useState} from 'react'
import { Link, Redirect } from 'react-router-dom'
import LogoutButton from "../../logoutButton";

function HeaderMenu() {

    return (
        <div className = "sticky-top" >
        <header style={headerStyle}>
            <h1>Food Delivery System</h1>
            <div className="d-flex justify-content-center"> 
                <div className="d-flex h-100"> 
                <div className ="align-self-center mx-auto" >
                <Link style={linkStyle} 
                  to='/fdsManager/'>Home</Link> | <Link style={linkStyle} 
                  to='/fdsManager/profile'>My Profile</Link> | <Link style={linkStyle} 
                  to='/fdsManager/promos'>FDS Promos</Link> | <Link style={linkStyle} 
                  to='/fdsManager/coupons'>FDS Coupons</Link> 
             </div> 
             <div className="d-flex justify-content-end">
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

export default HeaderMenu