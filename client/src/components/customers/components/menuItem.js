import React, {useState} from 'react';

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
     return (
       <React.Fragment>
       <div class="border  border-secondary" >
        <div class="media w-100 h-25 ">
        <img src="/assets/noImage.png" class="mr-3" alt="..."/>
        <div class="media-body">
          <h5 class="mt-0">{name}</h5>
          <small>{description}</small>
          <p> 
          </p>
        <p class="d- text-warning font-weight-bold">${price}</p>
        {/* <Form>
        <div class="d- btn-group position-relative" role="group" aria-label="Basic example">
        <Button type="button" class="btn btn-secondary">-</Button>
         <input type="text" class="form-control" >{qty}</input>
        <Button type="button" class="btn btn-secondary">+</Button>
        </div>
        </Form> */}
        {/* source : https://codepen.io/mystroken/pen/Moraab?__cf_chl_jschl_tk__=598df5dc8e56e5fee5ef75b7fa1f390d0cc50a34-1586334282-0-ATfTNxQ7hMcfAASFpJnlkVq1X1gSelLAQQT5bcBfbf3AaULH4bHd0GbC_Rank3FGInemEV2CooY48tlCKTQD_T8BCfCjLMZE30splh7U5pdjfLRshXxNMpVcf4ROM_CX5YVRugyQunGYzCMCdc2aFF-iS4q_XJHoDC-4WQHSClh_WUMjqiwAtS6tsV3HHdkPN_1_qD3-9J-v5FIUcmwnNS1XNqvX1TVBPvWIud2f1hWZZ7Yg1z5QYkDLdZTKZJuckemf08Q5BszlJHm9ml5W96DMmxzvalbADIPKKgx7YBZ6kj1CMl79mllCNUp0-hlzlQQBQaJSDggaKrOU22G2sd7cFOJ8aBdNcwchTAOEio6Y */}
        
        <div className="quantity-input">
        <div class= "row">
        <div class="col align-self-left">
        <button  className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
          &mdash;
        </button>
        <input className="quantity-input__screen" type="text" value={qty} readonly />
        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
          &#xff0b;
        </button> 
        </div>
        <div class ="col-3">
        <button type="button" onClick={(e)=> console.log('Click')} class="btn btn-success" style={{display:"flex",float:'left'}}>Add To Cart</button>
        </div>
      </div> 
      </div>  
      
        </div>
      </div>
      </div>
      </React.Fragment>
     )
}