import React from 'react'
import axios from 'axios'

import { Table, Button } from 'semantic-ui-react'

export default function OrdersTable(props) {

    const { orders, isCurrent } = props

    return (
        <Table color='grey'>
          <Table.Header>
            <Table.Row>
              {if (isCurrent) { <Table.HeaderCell/> }}
              <Table.HeaderCell>Order ID</Table.HeaderCell>
              <Table.HeaderCell>By Customer</Table.HeaderCell>
              <Table.HeaderCell>Total ($)</Table.HeaderCell>
              <Table.HeaderCell>Payment Mtd</Table.HeaderCell>
              <Table.HeaderCell>Li</Table.HeaderCell>
              <Table.HeaderCell>Ave. Orders Received (/day)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {promos.map( promo => (
                <PromoTableRow promo={promo} editHandler={e => segueToEdit(promo)} />
            ))}
          </Table.Body>
        </Table>
    )
}

function OrdersCard(props) {
    /*oid, cid, total, pymt, listofitems, status, is_prepped, drid, ordertime*/
    const { order_id, c_id, total, payment, listofitems, is_prepared, 
        dr_id, order_time,
        setPreparedHandler } = props.order;
    const { editHandler } = props

    const header = `{order_id} with total of ${total}`
    const metadata = `Ordered at {order_time.toLocaleString} by {c_id} using {payment}{dr_id != null ? `delivery rider {dr_id}` : ''}`

    useEffect(() => {
        //TODO: axios get listofitems.
    }, [props])

    return (
      <Table.Row>
        <Table.Cell><Button color='olive' onClick={editHandler}>Edit</Button></Table.Cell>
        <Table.Cell>{pid}</Table.Cell>
        <Table.Cell>{new Date(start_day).toLocaleString()}</Table.Cell>
        <Table.Cell>{new Date(end_day).toLocaleString()}</Table.Cell>
        <Table.Cell>{promoDesc}</Table.Cell>
        <Table.Cell>{numDaysActive}</Table.Cell>
        <Table.Cell>{aveOrders}</Table.Cell>
      </Table.Row>
    )
}

