import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Header from '../layouts/header';

export default function ResHome(props) {
    const [show, setShow] = useState(false);

    const [accInfo, setAccInfo] = useState('');
    //retrieve rid to put in props for future use.
    useEffect( () => {
        const fetchData = async () => {
            axios.get('/api/restaurant/')
                .then(res => {
                    if (res.data.length > 0) {
                        setAccInfo(res.data);
                        setShow(true);
                    }
                })
        }
        fetchData();
    }, [])

    return(
        <div className="ResHome">
        {show?
          <div>
            <Header/>
            <h1>restaurant staff Home page: will show all orders for now</h1>
            <p>acc info as follows: {JSON.stringify(accInfo)}</p>
          </div>
          
          : <div> <p>才怪</p> </div>
        }
        </div>
    )
}
