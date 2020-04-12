import React,{useState, useEffect} from 'react'
import Header from '../layout/header'
import Coupon from '../components/promo'
import axios from 'axios';

export default function FPromos(props) {

    return(
        <div>
            <Header/>
            <h1>Promos</h1>
        </div>
    )
}