import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../layouts/header';
import { Button } from 'semantic-ui-react';

import axios from 'axios'
import RMenu from '../components/res_menu'
import runWithRid from './performWithRid'

export default function ResMenu(props) {
    const history = useHistory();

    const [show, setShow] = useState(false);
    const [canModifyMenu, setCanModifyMenu] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [foodCategories, setFoodCategories] = useState([]);

    useEffect( () => {
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            axios.get('/api/restaurant/menu/' + rid)
                .then( res => {
                    if (res.status == 200) {
                        setShow(true)
                        setMenuItems(res.data)
                    }
                });
        })
        
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            axios.get('/api/restaurant/foodCategories/all')
                .then( res => {
                    if (res.status == 200) {
                        setFoodCategories(res.data)
                        setCanModifyMenu(true)
                    }
                });
        })
    }, [])

    function segueToAddItem() {
        console.log("requested to add item")
        history.push({
            pathname: '/restaurant/menu/edit',
            state: {
                isAdd: true,
                foodCategories: foodCategories,
                foodItem: {}
            }
        })
    }

    return(
        <div className="ResMenu">
        {show && canModifyMenu?
          <div>
            <Header/>
            <Button color='yellow' style={{ marginTop: '1em', marginBottom: '0.5em' }} 
                circular icon='add'
                onClick={e => segueToAddItem()} />

            <h1>who am i that i see... menu?</h1>
            <p>{JSON.stringify(menuItems)}</p>
          </div>
        : <div>
            <p>failed to load menu; please wait while we fetch data</p>
            <p>on that note can change this to the loading animation in the middle of the screen lol</p>
          </div>
        }
        </div>
    )
}

