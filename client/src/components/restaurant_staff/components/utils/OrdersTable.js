import React, {useEffect, useState} from 'react'
import axios from 'axios'

import { Card, Button, Label, Image } from 'semantic-ui-react'

export default function OrdersTable(props) {

    const { orders } = props

    return (
      <div>
        <Card.Group itemsPerRow={1}>
          { orders.map( order => <OrdersCard order={order} /> ) }
        </Card.Group>
      </div>
    )
}

function OrdersCard(props) {
    /*oid, cid, total, pymt, listofitems, status, is_prepped, drid, ordertime*/
    const { order_id, c_id, total, payment, listofitems, is_prepared, 
        dr_id, order_time, res_id,
        setPreparedHandler } = props.order;

    const [foods, setFoods] = useState([])
    const [fid2Count, setDict] = useState({})

    const totalNumItems = itemlist => {
        var num = 0
        for (var i = 0; i < itemlist.length; i++) {
            num += parseInt(itemlist[i][1])
        }
        console.log(num)
        return num
    }

    useEffect(() => {
        let fid2Count = {}
        let fids = []
        for (var i = 0; i < listofitems.length; i++) {
            fids.push(listofitems[i][0])
            fid2Count[listofitems[i][0]] = parseInt(listofitems[i][1])
        }
        setDict(fid2Count)
        console.log(fids)
        axios.get('/api/restaurant/menu/' + res_id + '/' + JSON.stringify(fids))
            .then(res => {
                if (res.status == 200) {
                    setFoods(res.data)
                }
            })
            .catch(err => {
                //TODO: is server err thrown here? idk see shuting's pr
                console.log(err)
            });
        
    }, [listofitems])

    const header = (order_id, total) => `${order_id} with total of $${total}`
    const metadata = (order_time, c_id, payment, dr_id) => `Ordered at ${order_time.toLocaleString()} by ${c_id} using ${payment}${dr_id != null ? "; delivery rider " +  dr_id : ''}`
    const desc = (listofitems) => is_prepared? 'You have finished preparing for this order.' 
                    :`You have ${totalNumItems(listofitems)} items to prepare in total.`

    return (
      <Card fluid>
        <Card.Content>
          {is_prepared ? <Label as='a' color='teal' detail floated='right' size='small'>Prepared</Label>
            : <Button color='red' onChange={setPreparedHandler}
                floated='right'>Set as prepared</Button>}
          <Card.Header>{header(order_id, total)}</Card.Header>
          <Card.Meta>{metadata(new Date(order_time), c_id, payment, dr_id)}</Card.Meta>
          <Card.Description>{desc(listofitems)}</Card.Description>
        </Card.Content>
        { foods.map( food => <Card.Content extra>
            <Image floated='right' size='mini' src={food.imagepath}/>
            <Card.Header>{fid2Count[food.food_id]}x {food.name}</Card.Header>
          </Card.Content>
        )}
      </Card>
    )
}

