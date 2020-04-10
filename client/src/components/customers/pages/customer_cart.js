import React ,{useReducer, useState, useEffect} from 'react';
import {useShoppingCart} from '../cart';

export default function CCart(props) {


   console.log(useShoppingCart().save);



    function back(e) {
        console.log(props);
        props.history.goBack();
    }

    return (
        <div>
        <h1> Cart</h1>
        <button onClick={back}>Back</button>
        </div>
    )
}