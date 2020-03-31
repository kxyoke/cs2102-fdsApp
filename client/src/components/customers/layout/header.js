import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'
import {Redirect} from "react-router";
import axios from 'axios';

function Header() {

    function logout(e) {
        // e.preventDefault();
        console.log('logout')
            axios.post('/logout').then(res=> {
                console.log(res.state)
                return <Redirect to="/"/>
            })
    }
    return (
        <div class = "sticky-top" >
        <header style={headerStyle}>
            <h1>Food Deliver</h1>
            <div class="d-flex justify-content-center"> 
                <div class="d-flex h-100"> 
                <div class ="align-self-center mx-auto" >
                <Link style={linkStyle} to='/customer/home'>Home</Link> | <Link style={linkStyle}
                to='/customer/order'>My Orders</Link> | <Link style={linkStyle}
                to='/customer/reviews'>My Reviews</Link> | <Link style={linkStyle}
                to='/customer/profile'>My Profile</Link> 
             </div> 
             <div class="d-flex justify-content-end">
                <button onClick = {logout} style={{display:"flex",float:'right'}} class="btn btn-outline-danger">Logout</button>
             
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

