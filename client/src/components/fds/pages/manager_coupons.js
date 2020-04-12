import React,{useState, useEffect} from 'react'
import Header from '../layout/header'
import Coupon from '../components/coupon'
import axios from 'axios';

export default function FCoupons(props) {

    return(
        <div>
            <Header/>
            <h1>Coupons</h1>
        </div>
    )
}