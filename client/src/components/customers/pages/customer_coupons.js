import React,{useState, useEffect} from 'react'
import Header from '../layout/header'
import CouponItem from '../components/couponItem'
import Axios from 'axios';

export default function CCoupons(props) {
    const [coupons, setCoupons] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await Axios.get('/api/customer/coupon')
                    .then(res=> {
                        console.log(res.data);
                        setCoupons(res.data);
                        setShow(true);
                    })
        }
        fetchData();
    }, [])

        return(
            
            <div className="MyCoupon">
            <Header/>
            <div class="container">
             {show?
             <div>
             <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Coupon Id</th>
                    <th scope="col">Description</th>
                    <th scope="col">Expiry date</th>
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
            </div>
        )

}