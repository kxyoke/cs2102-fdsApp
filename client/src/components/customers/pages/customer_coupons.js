import React,{useState, useEffect} from 'react'
import Header from '../layout/header'
import CouponItem from '../components/couponItem'
import Axios from 'axios';
import {Loader} from "semantic-ui-react";

export default function CCoupons(props) {
    const [coupons, setCoupons] = useState([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get('/api/customer/coupon')
                    .then(res=> {
                        if(res.data.length>0) {
                            setCoupons(res.data);
                            setShow(true);
                           
                        }
                        setLoading(false);
                    })
        }
        fetchData();
    }, [])

        return(
            
            <div className="MyCoupon">
            <Header/>
            {loading
            ? 
            <Loader active inline='centered'>Loading</Loader> 
            :
                <div class="container">
                {show?
                <div>
                <table class="table table-sm">
                    <thead>
                        <tr>
                        <th scope="col">Coupon Id</th>
                        <th scope="col">Description</th>
                        <th scope="col">Expiry date</th>
                        <th scope="col" > Status </th>
                        </tr>
                    </thead>
                    <tbody>
                        {coupons.map(cp=> 
                            
                            <CouponItem coupon={cp}/>
                            
                        )}
                        
                    </tbody>
                    </table>
                    </div>
                    :<div class ="mx-auto" style={{width:"350px"}}>
                        <p> </p>
                        <p> You have no Coupons....</p>
                    </div>
                }
                </div>
            }
            </div>
        )

}