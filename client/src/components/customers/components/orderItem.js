import React, {useState, useEffect} from 'react';

export default function OrderItem(props) {
    const {order_id, rname, payment, total,  listofitems, status, ordertime} = props.order;
   
    const time = new Date (ordertime);
   

    return (
        <React.Fragment>
        
            <div class="card text-left">
                <div class="card-header">
                <div class="row">
                    <div class="col">
                    Order id: {order_id} 
                    </div>
                    <div class="col">
                        Order time: {time.toLocaleString()}
                    </div>
                    <div class="col-left">
                     status:{status}
                     </div>
                </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        Restaurant : {rname}
                    </h5>
                    <p class="card-text"> 
                        
                    
                    <label>Food order:</label>
                    {listofitems.map(item=> (
                        <div class="row">
                            <div class="col-1"/>
                            <div class="col-8">
                                {item.name}
                            </div>
                            <div class="col">
                                {item.qty}x
                            </div>
                        </div>
                    ))}
                    </p>
                    <p> </p>
                    <p class="card-text"> 
                        payment :{payment}
                    </p>
                    <p class="card-text"> 
                        cost :$ {total}
                    </p>
                </div>
            </div>
            <p> </p>
           
        </React.Fragment>

    )
}