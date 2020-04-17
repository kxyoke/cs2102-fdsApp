import React from 'react'
import Utils from './utils'

import { Table } from 'semantic-ui-react'

export default function PromoTable(props) {
    const { activeStatus, promos } = props

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

    return (
        <Table color={tableColor()} key={tableColor()}>
          <Table.Header>
            <Table.Row>
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
                <PromoTableRow promo={promo} />
            ))}
          </Table.Body>
        </Table>
    )
}

function PromoTableRow(props) {
    const { pid, start_day, end_day, description, num_orders } = props.promo;
    const today = Date()
    let numDaysActive = today < Date(start_day)
        ? 0
        : today > Date(end_day)
            ? 0
            : (today.getTime() - start_day.getTime()) / (1000 * 3600 * 24);
    let aveOrders = num_orders / numDaysActive;

    let descProps = Utils.getDefaultPromoDescriptionProps(description)
    let promoDesc = Utils.getPromoDesc(descProps.minAmount, descProps.isAbs, descProps.discount)

    return (
      <Table.Row>
        <Table.Cell>{pid}</Table.Cell>
        <Table.Cell>{start_day}</Table.Cell>
        <Table.Cell>{end_day}</Table.Cell>
        <Table.Cell>{promoDesc}</Table.Cell>
        <Table.Cell>{numDaysActive}</Table.Cell>
        <Table.Cell>{aveOrders}</Table.Cell>
      </Table.Row>
    )
}

