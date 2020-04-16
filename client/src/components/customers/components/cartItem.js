import React, {useState} from 'react';
import Axios from 'axios';

export default function CartItem (props) {
    var { food_id, price, qty, foodname} = props.cartItem;
    price= parseFloat(price);
    console.log(props.parentProps);
    const [quantity, setQuantity] = useState(qty);
    function decrement() {
        if(quantity > 0) {
            setQuantity(quantity-1);
            Axios.post('/api/customer/cart', {
                food_id:food_id,
                qty:quantity-1
            }).then(res=> {
                console.log(res);
            })
            props.updateTotal(-price);

        }
    }

    function increment() {
        setQuantity(quantity+1);
        Axios.post('/api/customer/cart', {
            food_id:food_id,
            qty:quantity+1
        }).then(res=> {
            console.log(res);
        })
        props.updateTotal(price);
    }
    function deleteItem() {
        setQuantity(0);
        console.log('delete');
        Axios.post('/api/customer/cart', {
            food_id: food_id,
            qty:0
        })
        props.updateTotal(-price*quantity);
        
    }
     return (
      
        <React.Fragment>
        
         {quantity === 0 ? null:
        <div class="border  border-secondary" >
         <div class="media-body">
           <h6 class="mt-0">{foodname}</h6>
           
           <p> 
           </p>
         <p class="d- text ">${price}</p>
         
         <div className="quantity-input">
         <div class= "row">
         <div class="col align-self-left">
         <button  className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
           &mdash;
         </button>
         <input className="quantity-input__screen" type="text" value={quantity} readonly />
         <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
           &#xff0b;
         </button> 
         </div>
         <div class ="col-2">
         <button type="button" onClick={deleteItem} class="btn btn-secondary" style={{display:"flex",float:'left'}}>x</button>
         </div>
       </div> 
       </div>  
       
         </div>
         </div>
         }
       
         
       
       </React.Fragment>
       
     )
}