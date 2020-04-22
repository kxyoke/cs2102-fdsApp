import React, {useState}from 'react'
import {Redirect } from 'react-router-dom'
import axios from 'axios';

export default function LogoutButton () {
    const [navigate, setNavigate] = useState(false);

    function logout(e) {
        e.preventDefault();
        console.log('logout')
            axios.post('/logout').then(res=> {
                if(res.status === 200) {
                    alert("logout successfully");
                   setNavigate(true);
                }
            })
    }

    return (
        <div>
        <button onClick = {logout} style={{display:"flex",float:'right'}} class="btn btn-danger">Logout</button>
                {navigate? <Redirect to="/"/> : null}
        </div>
    )
}