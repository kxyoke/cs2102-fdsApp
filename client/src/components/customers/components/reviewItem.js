import React from 'react';
import {Rating} from 'semantic-ui-react';
export default function ReviewItem(props) {
    const {order_id, rname, food_rev, delivery_rating} = props.review;

    return (
        <React.Fragment>
            <div class="card text-left w-100">
                <div class="card-header">
                    Order id: {order_id}
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        Restaurant : {rname}
                    </h5>
                    <div class="row">
                        <div class="col">
                        <p class="card-text"> 
                        Review: {food_rev}
                        </p>
                        </div>
                        <p> </p>
                        <div class="col">
                        <p class="card-text"> 
                        Delivery Rating: <Rating defaultRating= {delivery_rating}
                                                maxRating = {5} disabled/>
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            <p> </p>
        </React.Fragment>

    )
}