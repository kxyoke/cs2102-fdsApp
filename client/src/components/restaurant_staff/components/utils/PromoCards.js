import React from 'react'
import Utils from './utils'
import { useHistory } from 'react-router-dom'

import { Table, Button } from 'semantic-ui-react'

export default function PromoTable(props) {
    const history = useHistory()

    const { activeStatus, promos } = props

    function segueToEdit(promo) {
        history.push({
            pathname: '/restaurant/promos/edit',
            state: {
                isAdd: false,
                promo: promo
            }
        })
    }

    const tableColor = () => {
        switch (activeStatus) {
            case Utils.PROMO_STATUS.active: 
                return "green";
            case Utils.PROMO_STATUS.future: 
                return "yellow";
            case Utils.PROMO_STATUS.past: 
                return "red";
            default:
                return "grey";
        }
    }
    
    const isPastPromo = activeStatus === Utils.PROMO_STATUS.past

    return (
        <Table color={tableColor()} key={tableColor()}>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell/>
              <Table.HeaderCell>Promo Id</Table.HeaderCell>
              <Table.HeaderCell>Start Date</Table.HeaderCell>
              <Table.HeaderCell>End Date</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
              <Table.HeaderCell>Been Active For (Days)</Table.HeaderCell>
              <Table.HeaderCell>Ave. Orders Received (/day)</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {promos.map( promo => (
                <PromoTableRow promo={promo} editHandler={e => segueToEdit(promo)} 
                  isPastPromo={isPastPromo}/>
            ))}
          </Table.Body>
        </Table>
    )
}

function PromoTableRow(props) {
    const { pid, start_day, end_day, description, num_orders } = props.promo;
    const { editHandler, isPastPromo } = props

    const today = new Date()
    let numDaysActive = today < new Date(start_day)
        ? 0
        : today > new Date(end_day)
            ? Utils.getNumDaysBetween(new Date(start_day), new Date(end_day))
            : Utils.getNumDaysBetween(new Date(start_day), today);
    let aveOrders = num_orders / numDaysActive;

    let descProps = Utils.getDefaultPromoDescProps(description)
    let promoDesc = Utils.getPrettyPromoDesc(descProps.minAmount, descProps.isAbs, descProps.discount)

    return (
      <Table.Row>
        <Table.Cell>
          {isPastPromo
            ? null 
            : <Button color='olive' onClick={editHandler}>Edit</Button>
          }
        </Table.Cell>
        <Table.Cell>{pid}</Table.Cell>
        <Table.Cell>{new Date(start_day).toLocaleString()}</Table.Cell>
        <Table.Cell>{new Date(end_day).toLocaleString()}</Table.Cell>
        <Table.Cell>{promoDesc}</Table.Cell>
        <Table.Cell>{numDaysActive}</Table.Cell>
        <Table.Cell>{Utils.roundNumberTo2Dp(aveOrders)}</Table.Cell>
      </Table.Row>
    )
}

