import React, {useState} from 'react';
import Axios from 'axios';

export default function CartItem (props) {
    var { food_id, res_id, price, qty, foodname} = props.cartItem;
    price= parseFloat(price);
    const [quantity, setQuantity] = useState(qty);
    function decrement() {
        if(quantity > 0) {
            setQuantity(quantity-1);
            Axios.post('/api/customer/cart', {
                food_id:food_id,
                qty:quantity-1,
                res_id:res_id
            }).then(res=> {
                props.updateTotal(-price);
            })
            

        }
    }

    function increment() {
        setQuantity(quantity+1);
        Axios.post('/api/customer/cart', {
            food_id:food_id,
            qty:quantity+1,
            res_id:res_id
        }).then(res=> {
           props.updateTotal(price);
        })
        
    }
    function deleteItem() {
        setQuantity(0);
        console.log('delete');
        Axios.post('/api/customer/cart', {
            food_id: food_id,
            qty:0,
            res_id:res_id
        })
        props.updateTotal(-price*quantity);
        
    }
     return (
      
        <React.Fragment>
        
         {quantity === 0 ? null:
        <div class="border  border-secondary" >
         <div class="container">
         <div class="row justify-content-start">
          <div class="col-7 align-self-left">
            <h6 class="mt-0 ">{foodname}</h6>
            
            <p> 
            </p>
          <p class="d- text ">${price}</p>
          </div>
          <div class="col">
          <div className="quantity-input">
          <div class= "row">

          <div class="col-8 align-self-left">
          <div class="input-group sm-1" >
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button" onClick={decrement}>-</button>
            </div>
            <input type="text" value={quantity}  style={inputStyle} readOnly/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" onClick={increment}>+</button>
            </div>
          </div>
          </div>

          <div class ="col-2">
          <button type="button" onClick={deleteItem} class="btn btn-secondary">x</button>
          </div>
          </div>
         </div>
       </div> 
       </div>  
       
         </div>
         </div>
         }
       
         
       
       </React.Fragment>
       
     )
}

const inputStyle= {
  width:30
}
