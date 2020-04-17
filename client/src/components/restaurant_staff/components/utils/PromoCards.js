import React from 'react'
import ResUtils from './utils.js'

import { Table } from 'semantic-ui-react'

export default function PromoTable(props) {
    const { activeStatus, promos } = props

    const tableColor = () => {
        switch (activeStatus) {
            case ResUtils.PROMO_STATUS.active: 
                return "green";
            case ResUtils.PROMO_STATUS.future: 
                return "yellow";
            case ResUtils.PROMO_STATUS.past: 
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
              <Table.HeaderCell>Ave. Orders Received (/day)<Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {promos.map( promo => (
                <PromoTableRow promo={promo} />
            )}
          </Table.Body>
        </Table>
    )
}

function PromoTableRow(props) {
    const { promo } = props;

    return (
      <Table.Row>
        <Table.Cell>promo.
      </Table.Row>
    )
}

