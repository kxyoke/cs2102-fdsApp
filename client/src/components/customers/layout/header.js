import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header style={headerStyle}>
            <h1>Food Deliver</h1>
            <Link style={linkStyle} to='/customer/home'>Home</Link> | <Link style={linkStyle}
             to='/customer/order'>My Orders</Link> | <Link style={linkStyle}
             to='/customer/reviews'>My Reviews</Link> | <Link style={linkStyle}
             to='/customer/profile'>My Profile</Link> 
        </header>
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