import React, {useState, useEffect } from 'react'
import Header from '../layout/header'
import axios from "axios";
import ReviewItem from '../components/reviewItem';

export default function CReviews(props) {
    const [reviews, setReviews] = useState([]);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/customer/review')
                        .then(res=> {
                            if(res.data.length > 0) {
                                setShow(true);
                                setReviews(res.data);
                            }
                            
                        })
        }
        fetchData();
    }, [])

  
        return(
            <div>
            <Header/>
            {show?
             <div class ="row justify-content-md-center" className="MyReviews">
                <table class="table">
                    <thread>
                    
                    {reviews.map(re => 
                        
                        <ReviewItem review={re}/>
                        
                    )}
                   
                    </thread>
                </table>
            </div>
            :<div class ="mx-auto" style={{width:"350px"}}>
            <p> </p>
           <p> You have no pastReviews....</p>

        </div>
            }
            </div>
        )
    
}