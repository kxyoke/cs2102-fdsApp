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
    const { order_id, usr_id, listofitems, food_rev, delivery_rating } = props.review
    const { res_id } = props

    const [foods, setFoods] = useState([])
    
    useEffect(() => {
        let fids = []
        for (var i = 0; i < listofitems.length; i++) {
            fids.push(listofitems[i][0])
        }
        axios.get('/api/restaurant/menu/' + res_id + '/' + JSON.stringify(fids))
            .then(res => {
                if (res.status == 200) {
                    setFoods(res.data)
                } else {
                    alert(res)
                }
            })
            .catch(err => {
                console.log(err)
            });
    }, [listofitems])

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
            <Card.Meta>
              
              <Popup pinned on='click'
                trigger={<Button content='View Ordered Items' color='olive' />}>
                <Card color='yellow'>
                  {foods.map( food => <Card.Content extra>
                    <Image floated='right' size='mini' src={food.imagepath}/>
                    <Card.Meta>{food.name}</Card.Meta>
                  </Card.Content>
                  )}
                </Card>
              </Popup>

            </Card.Meta>
            <Card.Description>{food_rev}</Card.Description>
          </Card.Content>
        </Card>
    )
}

