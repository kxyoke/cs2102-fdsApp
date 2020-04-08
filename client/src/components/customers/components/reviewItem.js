import React, {useState} from 'react';

export default function ReviewItem(props) {
    const {order_id, rname, food_rev, delivery_rating} = props.review;

    return (
        <React.Fragment>
            <div class="card text-center">
                <div class="card-header">
                    Order id: {order_id}
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        Restaurant : {rname}
                    </h5>
                    <p class="card-text"> 
                    Review: {food_rev}
                    </p>
                    <p> </p>
                    <p class="card-text"> 
                    Delivery Rating: {delivery_rating}
                    </p>
                </div>
            </div>
        </React.Fragment>

    )
}