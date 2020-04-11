import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Header from '../layouts/header';

import runWithRid from './performWithRid';

export default function ResHome(props) {
    const [show, setShow] = useState(false);

    const [accInfo, setAccInfo] = useState('');
    //retrieve rid to put in props for future use. --update use runWIthRid instead.
    useEffect( () => {
        runWithRid( userInfo => {
            setAccInfo(userInfo);
            setShow(true);
        })
    }, [])

    return(
        <div className="ResHome">
        {show?
          <div>
            <Header/>
            <h1>restaurant staff Home page: will show all orders for now</h1>
            <p>acc info as follows: {JSON.stringify(accInfo)}</p>
          </div>
          
          : <div> <p>才怪 ok tbh uid couldnt be loaded for some reason so yes</p> </div>
        }
        </div>
    )
}
