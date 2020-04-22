import React from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from "../../logoutButton";

function Header() {

    return (
        <div className = "sticky-top" >
        <header style={headerStyle}>
            <h1>Food Delivery System</h1>
            <div className="d-flex justify-content-center"> 
                <div className="d-flex h-100"> 
                <div className ="align-self-center mx-auto" >
                <Link style={linkStyle} 
                  to='/restaurant/'>Home</Link> | <Link style={linkStyle} 
                  to='/restaurant/profile'>My Profile</Link> | <Link style={linkStyle} 
                  to='/restaurant/reviews'>My Reviews</Link> | <Link style={linkStyle} 
                  to='/restaurant/promos'>My Promos</Link> | <Link style={linkStyle} 
                  to='/restaurant/menu'>My Menu</Link> | <Link style={linkStyle} 
                  to='/restaurant/orders'>My Orders</Link> 
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

export default Header

