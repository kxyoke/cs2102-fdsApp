import React, { useState, useEffect } from 'react'
import Header from '../layout/header'
import OrderItem from "../components/orderItem"
import axios from 'axios';
import {Loader} from 'semantic-ui-react';

export default function COrder(props) {
    const [loading, setLoading] = useState(true);
    const [pastOrders, setPastOrders] = useState([]);
    const [show, setShow] = useState(false);

    function orderedByTime(a,b) {
        const time_a = new Date(a.ordertime);
        const time_b = new Date(b.ordertime);
        return time_a-time_b;
    }
    useEffect( () => {
        const fetchData = async () => {

            await axios.get('/api/customer/order')
            .then (res => {
                if(res.data.length > 0) {
                     res.data.sort((a,b)=> 
                        new Date(b.ordertime) - new Date(a.ordertime)
                    );
                    
                    setPastOrders(res.data);
                    setShow(true);
                    setLoading(false);
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
            {loading? 
                <Loader active inline='centered'>Loading</Loader> 
            :
            <div>
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
            }
            </div>
            </div>
        )
    
}