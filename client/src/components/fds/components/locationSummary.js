import React from 'react';
import { Table } from 'semantic-ui-react'

export default function GeneralSummary(props) {
    const { area, total_orders } = props.locationSummary;
    
    return (
            <Table.Row>
                <Table.Cell>{area}</Table.Cell>
                <Table.Cell>{total_orders}</Table.Cell>
            </Table.Row>
    )
}