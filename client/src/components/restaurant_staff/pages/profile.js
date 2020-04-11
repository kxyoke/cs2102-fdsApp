import React, { useState, useEffect } from 'react'
import LogoutButton from "../../logoutButton";
import Header from '../layouts/header';

import axios from 'axios'
import RProfile from '../components/res_profile'
import runWithRid from './performWithRid'

export default function ResProfile(props) {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState({});

    useEffect( () => {
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            axios.get('/api/restaurant/' + rid)
                .then( res => {
                    if (res.data.length > 0) {
                        setShow(true)
                        setProfile(res.data[0])
                    }
                });
        })
    }, [])

    return(
        <div className="ResProfile">
        {show?
          <div>
            <Header/>
            <RProfile profile={profile} />
          </div>
        : <div> <p>failed to load profile</p></div>
        }
        </div>
    )
}

