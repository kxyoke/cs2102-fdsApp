import React, {useState, useEffect} from 'react'

import axios from 'axios'

import { Header, Pagination } from 'semantic-ui-react';
import MyHeader from '../layouts/header';
import ReviewsCardGroup from '../components/utils/ReviewCards';
import runWithRid from './performWithRid'

export default function ResReview(props) {
    const [isLoading, setLoading] = useState(true)
    const [rid, setRid] = useState('');
    const [reviews, setReviews] = useState([])

    useEffect(() => {
        runWithRid( userInfo => {
            const rid = userInfo.rid;
            setRid(rid);
            axios.get('/api/restaurant/reviews/' + rid)
                .then( res => {
                    if (res.status == 200) {
                        setReviews(res.data)
                        setLoading(false)
                    } else {
                        alert(res)
                    }
                })
                .catch( err => {
                    console.log(err)
                });
        })
    }, [props])

    return(
        <div className="ResReview">
        <MyHeader/>
          <div className='container' style={{ marginTop: '5em', marginBottom: '1em'}}>
            <Header as='h2'>Order reviews</Header>
            <ReviewsCardGroup reviews={reviews} res_id={rid} />
          </div>
        </div>
    )
}
