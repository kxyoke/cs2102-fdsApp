import React, {useState, useEffect } from 'react'
import Header from '../layout/header'
import axios from "axios";
import ReviewItem from '../components/reviewItem';
import {Menu, Segment, Dimmer, Loader} from 'semantic-ui-react';

export default function CReviews(props) {
    const [reviews, setReviews] = useState([]);
    const [showPastReviews, setShowPastReviews] = useState(false);
    const [showPendingReviews, setShowPendingReviews] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeItem, setActiveItem] = useState("Past reviews")
    const handleItemClick = (e, {name})=>setActiveItem(name);

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/customer/review')
                        .then(res=> {
                            if(res.data.length > 0) {
                                setLoading(false);
                                setShowPastReviews(true);
                                setReviews(res.data);
                            }
                            
                        })
        }
        fetchData();
    }, [])

  
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
                                            <p> You have no pastReviews....</p>

                                        </div>
                                    }
                                </div>
                                : <div>
                                    pending reviews
                                </div>
                            }
                            </Segment>
                        </div>
                    }
                </div>
            </div>
        )
    
}