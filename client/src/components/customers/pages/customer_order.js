import React, { useState, useEffect } from 'react'
import Header from '../layout/header'
import OrderItem from "../components/orderItem"
import axios from 'axios';
export default function COrder(props) {
    const [pastOrders, setPastOrders] = useState([]);
    const [show, setShow] = useState(false);
    useEffect( () => {
        const fetchData = async () => {

            await axios.get('/api/customer/order')
            .then (res => {
                if(res.data.length > 0) {
                    setPastOrders(res.data);
                    setShow(true);
                }
            })
            
        }
         fetchData();
    
    }, [])
        return(
            <div >
            <Header/>

            <div class="container">
            
            <p> </p>
             {show?
                <div class ="row justify-content-md-center" className="MyReviews">
                <ul class="table">
                    
                    
                    {pastOrders.map(re => 
                        
                        <OrderItem key={re.order_id} order={re}/>
                        
                    )}
                   
                    
                </ul>
            </div>
             : 
             <div class ="mx-auto" style={{width:"350px"}}>
            <p> </p>
            <p> You have not pastOrders....</p>

            </div>}
            </div>
            </div>
        )
    
}