import React, { useState, useEffect } from 'react'
import LogoutButton from "../../logoutButton";
import Header from '../layouts/header';

import axios from 'axios'
import RProfile from '../components/res_profile'

export default function ResProfile(props) {

    const {res_id} = props.location.state; //rmb to pass <ResProfile res_id={ri}/>

    console.log("within profile having resid " + res_id)

    const [profile, setProfile] = useState({});
    const apiPath = '/api/restaurant/' + res_id;

    console.log(apiPath);

    useEffect( () => {
        console.log("use effect profile triggered")
        const fetchData = async () => {
            await axios.get(apiPath)
                .then(res => {
                    console.log("recved "+res.data);
                    setProfile(res.data);
                });
        }
        fetchData();
    }, [])

    return(
        <div className="ResProfile">
        <Header/>
        <div> <p>load profile pls</p></div>
        <RProfile profile={profile} />

        </div>
    )
}

