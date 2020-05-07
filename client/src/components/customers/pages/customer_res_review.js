import React, {useState, useEffect} from 'react'

import axios from 'axios'

import { Header, Pagination } from 'semantic-ui-react';

import ReviewsCardGroup from '../components/ReviewCards';


export default function ResReview(props) {
    const [isLoading, setLoading] = useState(true)
    const [reviews, setReviews] = useState([])

    const {rid} = props
    useEffect(() => {
       
        const fetchData = async ()=> {
            await axios.get('/api/customer/res/reviews/' + rid)
                .then( res => {
                    if (res.status === 200) {
                        setReviews(res.data)
                        setLoading(false)
                    } else {
                        alert(res)
                    }
                })
                .catch( err => {
                    console.log(err)
                });
            }
        fetchData();

    }, [props])

    return(
        <div className="ResReview">
        
          <div className='container' style={{ marginTop: '5em', marginBottom: '1em'}}>
            <Header as='h2'>Order reviews</Header>
            <ReviewsCardGroup reviews={reviews} res_id={rid} />
            {reviews.length===0? <h4>Currently there are no reviews available for the restaurant</h4>:null}
          </div>
        </div>
    )
}
