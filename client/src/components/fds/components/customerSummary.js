import React from 'react';
import { Table } from 'semantic-ui-react'

export default function CustomerSummary(props) {
    const { cust_id, total_orders, total_cost } = props.customerSummaries;
    
    return (
            <Table.Row>
                <Table.Cell>{cust_id}</Table.Cell>
                <Table.Cell>{total_orders}</Table.Cell>
                <Table.Cell>{total_cost}</Table.Cell>
            </Table.Row>
    )
}