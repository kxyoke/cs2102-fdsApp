import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { Redirect } from 'react-router-dom';

export default function RestaurantItem(props) {

    const {res_id, rname}= props.restaurant;
    const [redirect, setRedirect] = useState(false);

   
    function enterRestaurant(e)  {
        console.log("Enter restaurant")

        setRedirect(true);

    }
    
    return (
        <React.Fragment>
         <div class="card border-secondary  text-center" href="#">
            
                <img src = '/assets/noImage.png' class="card-img-top" height="140" width="42" ></img>
               
                
                <div class="card">
                    <h5 class="card-title">{rname}</h5>
                    <a onClick={enterRestaurant} class="btn btn-primary"> Enter the restaurant</a>
                    {redirect? <Redirect to={{pathname:"/customer/resMenu",
                state:{res_id:res_id, rname:rname}}}/>:null}
                </div>
             
         </div>
         </React.Fragment>

    )
}