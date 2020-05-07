import React from 'react';
import { Table } from 'semantic-ui-react'

export default function RiderSummary(props) {
    const { rider_id, salary, total_deliveries, avg_delivery_time, total_ratings, averge_rating } = props.riderSummary;
    function roundToTwo(num) {
        console.log(num);
        if(num === undefined || num === null) {
            return 0;
        }
        return +(Math.round(num + "e+2")  + "e-2");
        
    }
    return (
            <Table.Row>
                <Table.Cell>{rider_id}</Table.Cell>
                <Table.Cell>{salary}</Table.Cell>
                <Table.Cell>{total_deliveries}</Table.Cell>
                <Table.Cell>{roundToTwo(avg_delivery_time)}</Table.Cell>
                <Table.Cell>{total_ratings === null? 0 : total_ratings}</Table.Cell>
                <Table.Cell>{roundToTwo(averge_rating)}</Table.Cell>
            </Table.Row>
    )
}