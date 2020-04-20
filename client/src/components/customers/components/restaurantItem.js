import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RestaurantItem(props) {

    const {res_id, rname}= props.restaurant;
   
    function enterRestaurant(e)  {
        console.log("Enter restaurant")

        props.props.history.push({pathname:"/customer/resMenu",
        state:{res_id:res_id, rname:rname}});

    }
    
    return (
        <React.Fragment>
         <div class="card border-secondary  text-center" href="#">
         <div class="card-header">
         {rname}
        </div>
                <img src = '/assets/noImage.png' alt="restaurant" class="card-img-top" height="140" width="42" ></img> 
                <div class="card">
                    <button onClick={enterRestaurant} class="btn btn-primary"> Enter the restaurant</button>
                </div>  
         </div>
         </React.Fragment>

    )
}