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
                    console.log(res.data);
                    setPastOrders(res.data);
                    setShow(true);
                }
            })
            
        }
         fetchData();
    
    }, [])
        return(
            <div>
            <Header/>
            <p> </p>
             {show?
                <div class ="row justify-content-md-center" className="MyReviews">
                <table class="table">
                    <thread class ="thead-dark">
                    
                    {pastOrders.map(re => 
                        
                        <OrderItem order={re}/>
                        
                    )}
                   
                    </thread>
                </table>
            </div>
             : 
             <div class ="mx-auto" style={{width:"350px"}}>
            <p> </p>
            <p> You have not pastOrders....</p>

            </div>}
            </div>
        )
    
}