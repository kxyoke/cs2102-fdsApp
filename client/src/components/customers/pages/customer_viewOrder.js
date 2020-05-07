import React, {useState, useEffect} from 'react'
import {Loader} from 'semantic-ui-react'
import Header from '../layout/header';
import 'semantic-ui-css/semantic.min.css'
import Axios from 'axios'
import InCompleteOrder from '../components/incompleteOrder'
export default function ViewOrder(props) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);
    useEffect(()=> {
        const fetchData =() =>{
        
        Axios.get('/api/customer/processingOrder')
            .then(res=> {
                setOrders(res.data);
                setLoading(false);
                if(res.data.length>0) {
                    setShow(true);
                }
            })
        };
        fetchData();

    },[])


    setTimeout(() => {
        props.history.go(0)
    }, 60000);
    return (
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
                    
                    
                    {orders.map(re => 
                        
                        <InCompleteOrder key={re.order_id} order={re}/>
                        
                    )}
                
                    
                </ul>
            </div>
            : 
            <div class ="mx-auto" style={{width:"350px"}}>
            <p> </p>
            <p> You have not Orders incomplete....</p>

            </div>}
        </div>
        }
        </div>
        </div>
    )
}
