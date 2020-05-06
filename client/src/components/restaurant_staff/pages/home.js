import React, {useState, useEffect} from 'react'
import axios from 'axios'

import MyHeader from '../layouts/header';

import runWithRid from './performWithRid';
import RHome from '../components/res_homeStats';

export default function ResHome(props) {
    const [show, setShow] = useState(false);

    const [accInfo, setAccInfo] = useState('');
    useEffect( () => {
        runWithRid( userInfo => {
            setAccInfo(userInfo);
            setShow(true);
        })
    }, [])

    return(
        <div className="ResHome">
          <MyHeader/>
          {show?
          <RHome userInfo={accInfo}/>
          :null}
        </div>
    )
}
