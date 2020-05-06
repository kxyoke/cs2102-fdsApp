import React from 'react';
import { Table } from 'semantic-ui-react'

export default function CustomerSummary(props) {
    const { usr_id, total_orders, total_cost } = props.promo;
    
    return (
            <Table.Row>
                <Table.Cell>{usr_id}</Table.Cell>
                <Table.Cell>{total_orders}</Table.Cell>
                <Table.Cell>{total_cost}</Table.Cell>
            </Table.Row>
    )
}