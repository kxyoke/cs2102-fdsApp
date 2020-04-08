import React, {useState}from 'react'
import { Link,Redirect } from 'react-router-dom'
import axios from 'axios';
import LogoutButton from "../../logoutButton";
import CartButton from './cart.js'
import 'bootstrap/dist/css/bootstrap.min.css';
function Header() {

    return (
        <div class = "sticky-top" >
            <header style={headerStyle}>
                <div class ="row">
                    <div class = "col-1"></div>
                    <div class="col align-self-center"> 
                        <h1>Food Deliver</h1>
                    </div>
                    <div class="col-1">
                        <LogoutButton/>
                    </div>
                </div>
            <div class="row justify-content-lg-center"> 
                <div class= "col-1"></div>
                <div class="col align-self-center"> 
                
                    <Link style={linkStyle} to='/customer'>Home</Link> | <Link style={linkStyle}
                    to='/customer/order'>My Orders</Link> | <Link style={linkStyle}
                    to='/customer/reviews'>My Reviews</Link> | <Link style={linkStyle}
                    to='/customer/profile'>My Profile</Link>
                </div> 
                <div class="col-1">
                    <CartButton/>
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

