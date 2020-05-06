import React, {useState, useEffect} from 'react'
import {Segment, Step, Container} from 'semantic-ui-react'
import Axios from 'axios'
export default function ViewOrder(props) {
    
    const {order_id, rname, payment, total,  listofitems, status, ordertime} = props.order;
    const time = new Date (ordertime);
    const [d_status, setStatus] = useState('');
    useEffect(() => {
        const fetchData =() =>{
        
            Axios.get('/api/customer/delivery/'+order_id)
                .then(res=> {
                    console.log(res.data);
                    const {
                            dr_leave_for_res,
                            dr_leave_res,
                            dr_arrive_cus} = res.data;
                    if(dr_arrive_cus) {
                        setStatus('arriving')
                    } else if (dr_leave_res) {
                        setStatus('on the way')
                    } else if (dr_leave_for_res) {
                        setStatus('preparing')
                    } else {
                        
                        setStatus('waiting')
                    }
                   
                })
            };
            fetchData();
    
        },[]);


    return (
        <div>
            <Container textAlign='center'>
            <Step.Group ordered widths={5} attached="top">
                <Step 
                    active={d_status === 'waiting'}
                    completed={d_status !== 'waiting'}
                >
                    <Step.Content>
                        <Step.Title>Waiting</Step.Title>
                    
                    </Step.Content>
                </Step>

                <Step 
                    active={d_status==='preparing'}
                    completed={d_status !=='preparing' && d_status!=='waiting'}
                >
                    <Step.Content>
                        <Step.Title>Preparing</Step.Title>
                    
                    </Step.Content>
                </Step>

                <Step
                    active={d_status==='on the way'}
                    completed={d_status ==='arriving' }>
                    <Step.Content>
                        <Step.Title>On the way</Step.Title>
                    </Step.Content>
                </Step>
                <Step
                    active={d_status==='arriving'}>
                    <Step.Content>
                        <Step.Title>Arriving!</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
            
            <Segment attached>
            <div class='card text-left'>
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
                <div  class= 'card-body'>
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
            </Segment>
            </Container>
        </div>
    )
}
