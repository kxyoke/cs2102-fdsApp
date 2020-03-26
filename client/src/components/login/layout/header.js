import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
    return (
        <header style={headerStyle}>
          <h1>Food Delivery System</h1>
          <h6>Copyrighted by Group 9 @ CS2102 2020</h6>
        </header>
    )
}

const headerStyle = {
    background:"#dc143c",
    color:'#fff',
    textAlign:'center',
    padding:'10px'
}

export default Header

