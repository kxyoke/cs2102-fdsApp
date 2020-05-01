import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../layouts/header';
import { Button, Popup } from 'semantic-ui-react';

import axios from 'axios'
import RMenu from '../components/res_menu'
import runWithRid from './performWithRid'

export default function ResMenu(props) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [rid, setRid] = useState('');
    const [canModifyMenu, setCanModifyMenu] = useState(false);
    const [foodCategories, setFoodCategories] = useState([]);
    const [rFoodCats, setRFoodCats] = useState([]);

    useEffect( () => {
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            setRid(rid);
            axios.get('/api/restaurant/foodCategories/all')
                .then( res => {
                    if (res.status == 200) {
                        setFoodCategories(res.data)
                        setCanModifyMenu(true)
                    } else {
                        alert(res)
                    }
                });
            axios.get('/api/restaurant/foodCategories/' + rid)
                .then( res => {
                    if (res.status == 200) {
                        setRFoodCats(res.data)
                        setShow(true)
                    } else {
                        alert(res)
                    }
                });
        })

    }, [])

    function segueToAddItem() {
        history.push({
            pathname: '/restaurant/menu/edit',
            state: {
                isAdd: true,
                allCategories: foodCategories,
                foodItem: {res_id: rid}
            }
        })
    }

    return(
        <div className="ResMenu">
          <Header/>
        {show && canModifyMenu?
          <div className='container'>
            <Popup
              trigger={<Button color='yellow' style={{ marginTop: '1em', marginBottom: '0.5em' }} 
                circular icon='add'
                onClick={e => segueToAddItem()} />
              }
              content='Add a new item!'
              inverted
            />

            <h1>who am i that i see... menu?</h1>
            <div className='container'>
              <RMenu rid={rid} rCategories={rFoodCats} allCategories={foodCategories}/>
            </div>
          </div>
        : <div>
            <p>am loading, please wait while we fetch data</p>
            <p>on that note can change this to the loading animation in the middle of the screen lol</p>
          </div>
        }
        </div>
    )
}

