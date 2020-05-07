import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function OrderItem(props) {

    const {res_id, rname}= props.restaurant;

    function enterRestaurant(e)  {
        console.log("Enter restaurant")

        props.props.history.push({pathname:"/customer/resMenu",
            state:{res_id:res_id, rname:rname}});

    }

    return (
        <React.Fragment>
            <div class="card border-secondary  text-center" href="#">
                <img src = '/assets/noImage.png' class="card-img-top" height="140" width="42" ></img>
                <div class="card">
                    <h5 class="card-title">{rname}</h5>
                    <a onClick={enterRestaurant} class="btn btn-primary"> Enter the restaurant</a>
                </div>
            </div>
        </React.Fragment>

    )
}