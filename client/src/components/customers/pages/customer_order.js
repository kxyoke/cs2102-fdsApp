import React, { useState, useEffect } from 'react'
import Header from '../layout/header'
import axios from 'axios';
export default function COrder(props) {
    const [pastOrders, setPastOrders] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            console.log(props);

            await axios.get('/api/customer/order')
                    .then(res=> {
                        console.log(res);
                        if(res.data.length >0 ) {
                            res.data.forEach(record => {
                                console.log(record);
                                
                            });
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
             <div className="MyOrders">
                <ul>
                    <h4>Past Order 1...</h4>
                    <h4>Past Order 2...</h4>
                    <h4>Past Order 3...</h4>
                    <h4>Past Order 4...</h4>
                    <h4>Past Order 5...</h4>
                </ul>
            </div>
            </div>
        )
    
}