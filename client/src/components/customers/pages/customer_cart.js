import React ,{useReducer, useState, useEffect} from 'react';
import {useShoppingCart} from '../cart';
import Header from '../layout/header';
import Axios from 'axios';

export default function CCart(props) {
    const [carts, setCarts] = useState([]);
    const [show, setShow] = useState(false);
//    console.log(useShoppingCart().save);
    useEffect(() => {
        const fetchData = async()=> {
            await Axios.get('/api/customer/cart')
                        .then(res=>{
                            console.log(res.data)
                            setShow(true);
                            setCarts(res.data);
                        })
        }
        fetchData();
    }, [])


    function back(e) {
        console.log(props);
        props.history.goBack();
    }

    return (
        <div>
            <Header/>
            
            <div class="container">
                <h1>Cart</h1>
                {/* <h1>{carts[0].rname}</h1>
                {carts.forEach(e=>
                <div>
                    <h5>{e.foodname}</h5>
                    <h5>{e.qty}</h5>
                    </div>
                    
                    )} */}
            </div>
        </div>
        
    )
}