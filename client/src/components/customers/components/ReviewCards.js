import React, {useState, useEffect} from 'react'
import { Card, Rating, Popup, Button, Image } from 'semantic-ui-react'

import axios from 'axios'

export default function ReviewsCardGroup(props) {
    const itemsPerRow = 2
    
    const { reviews, res_id } = props

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
          { reviews.map(rev => 
              <ReviewCard review={rev} res_id={res_id} />
          )}
        </Card.Group>
    )
}

function ReviewCard (props) {
    const { order_id, usr_id,food_rev, delivery_rating } = props.review
    
    
       

    const colour = (rev) => {
        return 'blue'
    }
    
    return (
        <Card color={colour(food_rev)}>
          <Card.Content>
            <Rating floated='right' size='medium' 
              icon='star' defaultRating={delivery_rating} maxRating={5}
              clearable={false} disabled
            />
            <Card.Header>{order_id} <span className="second-word-formatting">${'from ' + usr_id} </span></Card.Header>
            
            <Card.Description>{food_rev}</Card.Description>
          </Card.Content>
        </Card>
    )
}

