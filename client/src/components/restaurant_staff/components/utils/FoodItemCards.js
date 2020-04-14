import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default function FoodItemCardGroup({formattedFoodItems}) {
    const itemsPerRow = 2;

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
          formattedFoodItems.map( (formattedFoodItem) => (
              <FoodItemCard fooditem={formattedFoodItem.fooditem}
                onEditHandler={formattedFoodItem.onEditHandler}
                onDeleteHandler={formattedFoodItem.onDeleteHandler}
                onAvailabilityHandler={formattedFoodItem.onAvailabilityHandler})
              />
          )
        </Card.Group>
    )
}

function FoodItemCard ({fooditem, onEditHandler, onDeleteHandler, onAvailabilityHandler}) {

    // not sure why i chose functions, maybe cus more flexible, but ok
    const foodTitle = (food) => food.name + "\t" + food.price;
    const foodMeta = (food) => (
        <p>"Category: " + food.category </p>
        <p>"Daily limit set to " + food.daily_limit<p>
    )
    //!!! insert the daily limit somewhere, availability label(clickable), and daily sells so far.
    const foodDescription = (food) => food.description;

    const isStillAvailable = (food) => food.daily_sells < food.daily_limit;

    return (
        <Card color={isStillAvailable? food.available ? 'green' : 'red' : 'orange'}>
          <Card.Content>
            <Image floated='right' size='mini' 
              src='https://5b0988e595225.cdn.sohucs.com/images/20171003/16734d2bcb5942cda7087540efafb9b0.jpeg‘
            />
            <Card.Header>{foodTitle(fooditem)}</Card.Header>
            <Card.Meta>{foodMeta(fooditem)}</Card.Meta>
            <Card.Description>{foodDescription(fooditem)}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className='ui two buttons'>
              <Button basic color='green'
                onClick={onEditHandler}>
                Edit
              </Button>
              <Button basic color='red'
                onClick={onDeleteHandler}>
                Delete
              </Button>
            </div>
          </Card.Content>
          {!isStillAvailable?
              <Card.Content extra>
                Daily limit reached.
              </Card.Content>
            : fooditem.available?
              <Card.Content extra>
                <p>Sold {fooditem.daily_sells} so far today.</p>
                <Button basic color='red'
                  onClick={ e => onAvailabilityHandler(e, false) }>
                  Make unavailable?
                </Button>
              </Card.Content>
            : <Card.Content extra>
                You have made it unavailable. 
                <Button basic color='yellow'
                  onClick={ e => onAvailabilityHandler(e, true) }>
                  Make available?
                </Button>
              </Card.Content>
          }
        </Card>
    )
}

