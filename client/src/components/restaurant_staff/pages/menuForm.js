import React, { useState, useEffect } from 'react'
import Header from '../layouts/header';

import axios from 'axios'

import RMenuItemForm from '../components/res_menuItemForm'
import runWithRid from './performWithRid'

export default function ResMenuEdit(props) {

    const [show, setShow] = useState(false);
    const [foodCategories, setFoodCategories] = useState([]);
    
    const { isAdd, foodItem } = props.location.state;

    //retrieve categories yos
    useEffect( () => {
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            axios.get('/api/restaurant/foodCategories/all')
                .then( res => {
                    if (res.status == 200) {
                        setFoodCategories(res.data)
                        setShow(true)
                    }
                });
        })

    }, [])


    return(
        <div className="ResMenuForm">
        {show?
          <div>
            <Header/>
            <RMenuItemForm isAdd={isAdd} foodCategories={foodCategories} foodItem={foodItem} />
          </div>
        : <div>
            <p>insert loading animation</p>
          </div>
        }
        </div>
    )
}

