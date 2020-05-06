import React from 'react';
import { Table } from 'semantic-ui-react'

export default function GeneralSummary(props) {
    const { total_orders, total_cost } = props.generalSummary;
    
    return (
            <Table.Row>
                <Table.Cell>{total_orders}</Table.Cell>
                <Table.Cell>{total_cost}</Table.Cell>
            </Table.Row>
    )
}