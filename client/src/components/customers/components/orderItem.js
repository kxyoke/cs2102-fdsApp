import React, {useState, useEffect} from 'react';

export default function OrderItem(props) {
    const {order_id, rname, payment, total,  listofitems, status} = props.order;
    const [foodList, setFoodList] = useState([])
    useEffect(() => {
        for(const food of listofitems) {
            setFoodList(old => [...old, food.name])
        }
    }, [])

    return (
        <React.Fragment>
            <div class="card text-left">
                <div class="card-header">
                <div class="row">
                    <div class="col">
                    Order id: {order_id} 
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
                        Food order: {foodList.join()}
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
        </React.Fragment>

    )
}