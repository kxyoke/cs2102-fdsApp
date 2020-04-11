import React, {useState, useContext}from 'react';
import { NavLink,Redirect } from 'react-router-dom';
import LogoutButton from "../../logoutButton";
import CartButton from './cart.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {

    return (
       
           
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand">Food Deliver</a>
                
                <div class="col align-self-left"> 
                    <NavLink style={linkStyle} to='/customer'>Home</NavLink> | 
                    <NavLink style={linkStyle} to='/customer/order'>My Orders</NavLink> | 
                    <NavLink style={linkStyle} to='/customer/reviews'>My Reviews</NavLink> | 
                    {/* make this to drop down link */}
                    <NavLink style={linkStyle} to='/customer/profile'>My Profile</NavLink>
                </div> 
                <div class="row">
                <div class="col-md-auto">
                    <CartButton/>
                </div>
                <div class="col-md-auto">
                   <LogoutButton/>
                </div>
                </div>
                
                </nav>
      
       
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

