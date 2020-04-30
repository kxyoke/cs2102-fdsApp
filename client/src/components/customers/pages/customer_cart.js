import React ,{useState, useEffect} from 'react';
import CartItem from "../components/cartItem";
import Header from '../layout/header';
import Axios from 'axios';
import {Divider, Button, Modal} from 'semantic-ui-react';
import CouponModal from '../components/useCouponModal';
export default function CCart(props) {
    //general 
    const [carts, setCarts] = useState([]);
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(2.99);
    const [coupon, setCoupon] = useState('');
    const [addresses, setAddresses] = useState([]);
    const [recentAddress, setRecentAddress]=useState('');
    const [payment, setPayment] = useState("card");
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
        
    }
    function updateTotal(update) {
        const ct = subtotal + update;
        if(ct === 0 ) {
            setTotal(0);
            setSubtotal(0);
        } else {

            setSubtotal(roundToTwo(ct));
            setTotal(roundToTwo(ct+deliveryFee));
        }
    }
    async function getTotal(input) {
        var temp =0;
        await input.forEach(item=> {
                
            temp = roundToTwo(temp+(parseFloat(item.price)*item.qty));
        })
     
        
        setSubtotal(temp);
  
        setTotal(roundToTwo(temp+deliveryFee));
    }

    useEffect(() => {
        const fetchData = async()=> {
            await Axios.all([
            Axios.get('/api/customer/cart'),
            Axios.get('/api/customer/address')
            ])
            .then(Axios.spread((...res)=> {
                const res1 = res[0];
                const res2=res[1];
                console.log(res2.data);

                if(res1.data !== 'empty') {
                    setCarts(res1.data);
                    setShow(true);
                    getTotal(res1.data);
                } else {
                    setShow(false)
                }
                setAddresses(res2.data);
                setRecentAddress(res2.data[0].address);
                console.log(res2.data[0].address);
            })
            ).catch(err=> {
                console.log(err)
            })
        }
        fetchData();
    }, [])


    function back(e) {
        if(carts.length>0) {
       
        props.history.push({pathname:"/customer/resMenu",
        state:{res_id:carts[0].res_id, rname:carts[0].rname}});
        } else {

            props.history.goBack();
        }
    }

    function useCoupon(description) {
        //set the coupon constant
        //update the total price
        //show the coupon in the price
    }

    function editAddress() {
        //change the delivery address
        //show the list of address stored in the database
        //allow update of new address
    }
    return (
        
        <div>
            <Header/>
            
            <div class="container">
                {show?
                <div>
                <h3>Restaurant name: {carts[0].rname}</h3>
                    
                {carts.map((e, i)=>
                <div>
                    <CartItem key={i} cartItem={e} updateTotal = {updateTotal}/>
                    </div>
                    
                    )}
                    <Divider/>
                    <div class="border  border-secondary" >
                    <div>
                    <div class = "row">
                        <div class="col">
                        <h5 class='text-left'> Subtotal:</h5>
                        </div>
                        <div class="col">
                        <h5 class='text-right'> ${subtotal}</h5>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col">
                            <h5 class='text-left'>Delivery fee:</h5>
                        </div>
                        <div class="col">
                            <h5 class='text-right'>${deliveryFee}</h5>
                        </div>
                    </div>
                    {/* <button type="button" class="btn btn-link" >Use coupons</button> */}
                    
                    <div class="row">
                        <div class="col">
                            <h3 class='text-left font-weight-bold'>Total : </h3>
                        </div>
                        <div class="col">
                            <h3 class="text-right font-weight-bold">${total}</h3>
                        </div>
                    </div>
                        
                    </div>
                    </div>
                    
                    <CouponModal/>
                    
                    <Divider/>
                    <div>
                    <label> Delivery details : </label>
                    <label>Address </label>
                    
                    <address > {recentAddress}</address>
                    <button>Edit</button>
                    
                    </div>
                    <Divider/>
                    <p>Delivery time:ASAP(30mins)</p>
                    <button>change</button>
                    <Divider/>
                    <p> payment :{payment}</p>
                    <button>Change</button>
                    <Divider/>
                    </div>
                :
                <div class ="mx-auto" style={{width:"350px"}}>
                    <p> </p>
                    <p> You have no item in your cart!....</p>
                </div>
                }
                
               <button class="btn btn-light" onClick={back}>Back to Restaurant</button>
               <button class="btn btn-danger" onClick={back}>Pay</button>
            </div>
        </div>
        
    )
}