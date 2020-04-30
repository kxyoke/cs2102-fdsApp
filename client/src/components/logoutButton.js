import React, {useState}from 'react'
import {Redirect } from 'react-router-dom'
import axios from 'axios';

export default function LogoutButton () {
    const [navigate, setNavigate] = useState(false);

    function logout(e) {
        e.preventDefault();
            axios.post('/logout').then(res=> {
                if(res.status === 200) {
                    alert("logout successfully");
                   setNavigate(true);
                }
            })
    }

    return (
        <div>
        <button onClick = {logout} class="btn btn-danger">Logout</button>
                {navigate? <Redirect to="/"/> : null}
        </div>
    )
}