import React, {useState} from 'react';
import Axios from 'axios';

export default function MenuItem (props) {
    const {food_id, price, name, description} = props.foodItem;
    const [qty, setQty] = useState(0);
    function decrement() {
        if(qty > 0) {
            setQty(qty-1);
        }
    }

    function increment() {
        setQty(qty+1);
    }

    function addToCart() {
      console.log("add to cart")
      if (qty > 0) {
        Axios.post('/api/customer/cart/add', 
                  {food_id: food_id,
                  res_id: props.res_id,
                    qty: qty})
            .then(res=> {
              if(res.data) {
                alert(res.data);
              } else {
                alert("added to the cart");
              }
            });
          }

    }
     return (
       <React.Fragment>
       <li class="d-inline border  table-cell" >
       <div class="border  border-secondary" >
        <div class="media w-100 h-25 ">
        <img src="/assets/noImage.png" class="mr-3" alt="..."/>
        <div class="media-body">
          <h5 class="mt-0">{name}</h5>
          <small>{description}</small>
          <p> 
          </p>
        <p class="d- text-warning font-weight-bold">${price}</p>
        
        
        <div className="quantity-input">
        <div class= "row">

          <div class="col-8 align-self-left">
          <div class="input-group sm-1" >
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary" type="button" onClick={decrement}>-</button>
            </div>
            <input type="text" value={qty}  style={inputStyle} readOnly/>
            <div class="input-group-append">
              <button class="btn btn-outline-secondary" type="button" onClick={increment}>+</button>
            </div>
          </div>
          </div>

       
        <div class ="col-3">
        <button type="button" onClick={addToCart} class="btn btn-success" style={{display:"flex",float:'left'}}>Add To Cart</button>
        </div>
      </div> 
      </div>  
      
        </div>
      </div>
      </div>
      </li>
      </React.Fragment>
     )
}

const inputStyle= {
  width:30
}