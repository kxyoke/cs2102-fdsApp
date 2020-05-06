import React, { useState, useEffect } from 'react'
import Header from '../layouts/header';
import { Loader } from 'semantic-ui-react'

import axios from 'axios'
import RProfile from '../components/res_profile'
import runWithRid from './performWithRid'

export default function ResProfile(props) {
    const [show, setShow] = useState(false);
    const [profile, setProfile] = useState({});
    const [userInfo, setUserInfo] = useState({});

    useEffect( () => {
        runWithRid( userInfo => {
            setUserInfo(userInfo)
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
            <RProfile profile={profile} userInfo={userInfo} />
          </div>
        : <Loader active />
        }
        </div>
    )
}

