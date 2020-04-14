import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'

export default function FoodItemCardGroup(props) {
    const itemsPerRow = 2;

    const { formattedFoodItems } = props

    return (
        <Card.Group itemsPerRow={itemsPerRow}>
          {formattedFoodItems.map(formattedFoodItem =>
              <FoodItemCard fooditem={formattedFoodItem.fooditem}
                onEditHandler={formattedFoodItem.onEditHandler}
                onDeleteHandler={formattedFoodItem.onDeleteHandler}
                onAvailabilityHandler={formattedFoodItem.onAvailabilityHandler}
              />
          )}
        </Card.Group>
    )
}

function FoodItemCard ({fooditem, onEditHandler, onDeleteHandler, onAvailabilityHandler}) {

    // not sure why i chose functions, maybe cus more flexible, but ok
    const foodMeta = (food) => (
        <div>
        <p>Category:  {food.category}</p>
        <p>Daily limit set to {food.daily_limit}</p>
        </div>
    )
    const foodDescription = (food) => food.description;
    const foodImage = (food) => {
        let path = food.imagepath
        if (path == '') {
            return 'https://bitsofco.de/content/images/2018/12/Screenshot-2018-12-16-at-21.06.29.png'
        } else {
            return path
        }
    }

    const isStillAvailable = (food) => food.daily_sells < food.daily_limit;

    return (
        <Card color={isStillAvailable? fooditem.available ? 'green' : 'red' : 'orange'}>
          <Card.Content>
            <Image floated='right' size='medium' 
              src={foodImage(fooditem)}
            />
            <Card.Header>{fooditem.name} <span className="second-word-formatting">${fooditem.price} </span></Card.Header>
            <Card.Meta>{foodMeta(fooditem)}</Card.Meta>
            <Card.Description>{foodDescription(fooditem)}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button basic color="green"
                onClick={onEditHandler}>
                Edit
              </Button>
              <Button basic color="red"
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
                <Button basic color="orange"
                  onClick={ e => onAvailabilityHandler(e, false) }>
                  Make unavailable?
                </Button>
              </Card.Content>
            : <Card.Content extra>
                You have made it unavailable. 
                <Button basic color="yellow"
                  onClick={ e => onAvailabilityHandler(e, true) }>
                  Make available?
                </Button>
              </Card.Content>
          }
        </Card>
    )
}

