import React from 'react';
import { Table } from 'semantic-ui-react'

export default function RiderSummary(props) {
    const { cust_id, salary, total_deliveries, avg_delivery_time, total_ratings, averge_rating } = props.riderSummaries;
    
    return (
            <Table.Row>
                <Table.Cell>{cust_id}</Table.Cell>
                <Table.Cell>{salary}</Table.Cell>
                <Table.Cell>{total_deliveries}</Table.Cell>
                <Table.Cell>{avg_delivery_time}</Table.Cell>
                <Table.Cell>{total_ratings}</Table.Cell>
                <Table.Cell>{averge_rating}</Table.Cell>
            </Table.Row>
    )
}