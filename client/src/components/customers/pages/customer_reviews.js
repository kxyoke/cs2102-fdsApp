import React, {useState, useEffect } from 'react'
import Header from '../layout/header'
import axios from "axios";
import ReviewItem from '../components/reviewItem';
import {Menu, Segment, Table, Loader, Button} from 'semantic-ui-react';
import ReviewModal from '../components/makeReview'
export default function CReviews(props) {
    const [reviews, setReviews] = useState([]);
    const [showPastReviews, setShowPastReviews] = useState(false);
    const [showPendingReviews, setShowPendingReviews] = useState(false);
    const [pendingReview, setPendingReview] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState("Past reviews")
    const handleItemClick = (e, {name})=>setActiveItem(name);

    useEffect(() => {
        const fetchData = async () => {
            await axios.all ([
                axios.get('/api/customer/review'),
                axios.get('/api/customer/review/pending')
            ])
                        .then(axios.spread((...res)=> {
                            const res1= res[0];
                            const pending = res[1];
                            if(res1.data.length > 0) {
                                setLoading(false);
                                setShowPastReviews(true);
                                
                                setReviews(res1.data);
                                
                            }
                            if(pending.data.length>0) {
                                setPendingReview(pending.data);
                                setShowPendingReviews(true);
                            }
                            
                        }))
        }
        fetchData();
    }, []);

    function orderTime(place_order_time) {
        const time = new Date(place_order_time);
        return time.toLocaleString;
    }

    function update(order_id) {
        //pending for debug
        const temp = pendingReview.filter(item=> item.order_id !== order_id);
        setPendingReview(temp);
    }

  
        return(
            <div>
                <Header/>
                <div class="container">
                
                    <p> </p>
                    {loading? 
                            <Loader active inline='centered'>Loading</Loader>   
                     :
                        <div>
                            <Menu attached='top' tabular>
                                <Menu.Item
                                    name="Past reviews"
                                    active= {activeItem === 'Past reviews'}
                                    onClick={handleItemClick}
                                />
                                <Menu.Item
                                    name="Pending reviews"
                                    active={activeItem==='Pending reviews'}
                                    onClick={handleItemClick}
                                />
                            </Menu>
                            <Segment attached ="bottom">
                            {activeItem === 'Past reviews'
                                ? <div>
                                    {showPastReviews
                                    ?
                                        <div class ="row justify-content-md-center" className="MyReviews">  
                                            {reviews.map(re => 
                                                <ReviewItem review={re}/>
                                            )}
                                        </div>
                                    :
                                        <div class ="mx-auto" style={{width:"350px"}}>
                                            <p> </p>
                                            <p> You have no past Reviews....</p>

                                        </div>
                                    }
                                </div>
                                : <div>
                                    {showPendingReviews
                                    ? 
                                        <div class ="row justify-content-md-center" className="PendingReviews">  
                                            <Table >
                                                <Table.Header>
                                                    <Table.Row>
                                                        <Table.HeaderCell> Restaurant</Table.HeaderCell>
                                                        <Table.HeaderCell>Date of order</Table.HeaderCell>
                                                        <Table.HeaderCell> </Table.HeaderCell>
                                                    </Table.Row>
                                                </Table.Header>
                                                
                                                <Table.Body>
                                                    {pendingReview.map(re => 
                                                        <Table.Row>
                                                            <Table.Cell> {re.rname}</Table.Cell>
                                                            <Table.Cell> {orderTime(re.place_order_time)}</Table.Cell>
                                                            <Table.Cell> <ReviewModal order_id = {re.order_id} /></Table.Cell>
                                                        </Table.Row>
                                                    )}
                                                </Table.Body>
                                            </Table>
                                            
                                        </div>
                                    :
                                        <div class ="mx-auto" style={{width:"350px"}}>
                                            <p> </p>
                                            <p> You have no pending Reviews....</p>
                                            {/* <ReviewModal order_id="1" update={update}/> */}
                                        </div>}
                                </div>
                            }
                            </Segment>
                        </div>
                    }
                </div>
            </div>
        )
    
}