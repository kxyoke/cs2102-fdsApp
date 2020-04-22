import React from 'react'
import { Card, Rating } from 'semantic-ui-react'

export default function ReviewsCardGroup(props) {
    const itemsPerRow = 2
    
    const { reviews } = props

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
          { reviews.map(rev => 
              <ReviewCard review={rev} />
          )}
        </Card.Group>
    )
}

function ReviewCard (props) {
    const { order_id, usr_id, listOfItems, food_rev, delivery_rating } = props.review

    const colour = (rev) => {
        return 'blue'
    }
/*
    function prettyStringOfItems(list) {
        var string = list[0].name
        for (var i = 0; i < list.length; i++) {
            string += ', ' + list[i].name
        }
        return string
    }
*/
    return (
        <Card color={colour(food_rev)}>
          <Card.Content>
            <Rating floated='right' size='medium' 
              icon='star' defaultRating={delivery_rating / 2} maxRating={5}
              clearable={false} disabled
            />
            <Card.Header>{order_id} <span className="second-word-formatting">${'from ' + usr_id} </span></Card.Header>
            <Card.Meta>
              {
                /*
                prettyStringOfItems(listOfParsedItems)
                */
              }
                Click to expand items [TODO]
            </Card.Meta>
            <Card.Description>{food_rev}</Card.Description>
          </Card.Content>
        </Card>
    )
}

