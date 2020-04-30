import React ,{useState, useEffect} from 'react';
import CartItem from "../components/cartItem";
import Header from '../layout/header';
import Axios from 'axios';

export default function CCart(props) {
    const [carts, setCarts] = useState([]);
    const [show, setShow] = useState(false);
    const [total, setTotal] = useState(0);
//    console.log(useShoppingCart().save);
    function roundToTwo(num) {
        return +(Math.round(num + "e+2")  + "e-2");
        
    }
    function updateTotal(update) {
        const ct = total + update;
        if(ct === 0 ) {
            setTotal(0);
        } else {

        
        setTotal(roundToTwo(total+update));
        }
    }

    console.log(props.history);
    useEffect(() => {
        const fetchData = async()=> {
            await Axios.get('/api/customer/cart')
                        .then(res=>{
                            if(res.data !== 'empty') {
                                setCarts(res.data);
                                setShow(true);
                                res.data.forEach(item=> {
                
                                    setTotal(roundToTwo(total+(parseFloat(item.price)*item.qty)));
                                })
                        
                            } else {
                                setShow(false)
                            }
                        })
        }
        fetchData();
    }, [])


    function back(e) {
        console.log(props);
        if(carts.length>0) {
       
        props.history.push({pathname:"/customer/resMenu",
        state:{res_id:carts[0].res_id, rname:carts[0].rname}});
        } else {

            props.history.goBack();
        }
    }

    return (
        <div>
            <Header/>
            
            <div class="container">
                {show?
                <div>
                <h3>Restaurant name: {carts[0].rname}</h3>
                    
                {carts.map(e=>
                <div>
                    <CartItem cartItem={e} updateTotal = {updateTotal}/>
                    </div>
                    
                    )}
                    
                    <div>
                        <h5 class='text-right'> Subtotal:</h5>
                        <h5 class='text-right'>Delivery fee:</h5>
                        <h4 class='text-right'>Total : {total}</h4>
                    </div>
                    </div>
                :
                <div class ="mx-auto" style={{width:"350px"}}>
                    <p> </p>
                    <p> You have no item in your cart!....</p>
                </div>
                }
                
               <button class="btn btn-light" onClick={back}>Back to Restaurant</button>
            
            </div>
        </div>
        
    )
}