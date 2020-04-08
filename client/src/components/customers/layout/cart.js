import React, {useState}from 'react'
import {Redirect } from 'react-router-dom'
import axios from 'axios';

export default function CartButton () {
    const [navigate, setNavigate] = useState(false);

    function cart(e) {
        e.preventDefault();
        console.log('cart')
            // axios.post('/logout').then(res=> {
            //     if(res.status === 200) {
            //         alert("logout successfully");
            //        setNavigate(true);
            //     }
            // })
    }

    return (
        <div>
        <button type="button" style={{display:"flex",float:'right'}} data-toggle = "modal" data-target="#modalCart" class="btn btn-warning">cart</button>
        </div>

        

    )
}