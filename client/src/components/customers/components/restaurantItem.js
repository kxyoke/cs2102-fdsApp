import React from 'react';
import {Image, Card} from 'semantic-ui-react';

export default function RestaurantItem(props) {

    const {res_id, rname, rimagepath}= props.restaurant;
   
    function enterRestaurant(e)  {
        console.log("Enter restaurant")

        props.props.history.push({pathname:"/customer/resMenu",
        state:{res_id:res_id, rname:rname}});

    }

    const imagesrc = rimagepath === undefined ? 'https://react.semantic-ui.com/images/wireframe/image.png' : rimagepath
    console.log(imagesrc)
    
    return (
        <Card>
          <Card.Content>
           {rname}
          </Card.Content>
          <Image wrapped src={imagesrc} /> 
          <Card.Content extra>
             <button onClick={enterRestaurant} class="btn btn-primary"> Enter the restaurant</button>
          </Card.Content>  
         </Card>

    )
}
