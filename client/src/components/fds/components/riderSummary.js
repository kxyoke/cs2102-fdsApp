import React from 'react';
import { Table } from 'semantic-ui-react'

export default function RiderSummary(props) {
    const { rider_id, salary, total_deliveries, avg_delivery_time, total_ratings, average_rating } = props.riderSummary;
    function roundToTwo(num) {
        console.log(num);
        return +(Math.round(num + "e+2")  + "e-2");
        
    }
    return (
            <Table.Row>
                <Table.Cell>{rider_id}</Table.Cell>
                <Table.Cell>{salary}</Table.Cell>
                <Table.Cell>{total_deliveries}</Table.Cell>
                <Table.Cell>{roundToTwo(avg_delivery_time)}</Table.Cell>
                <Table.Cell>{total_ratings}</Table.Cell>
                <Table.Cell>{roundToTwo(average_rating)}</Table.Cell>
            </Table.Row>
    )
}