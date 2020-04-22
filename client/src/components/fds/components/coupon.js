import React from 'react';
import { useHistory } from 'react-router-dom'
import {Button, Table} from 'semantic-ui-react'

export default function Coupon(props) {
    const {coupon_id, usr_id, description, expiry_date} = props.coupon;
    const date = new Date(expiry_date);
    const history = useHistory();

    function edit() {
        history.push({
            pathname: '/fdsManager/coupons/edit',
            state: {
                isEdit: true,
                coupon: props.coupon
            }
        })
    }

    
    return (
            <Table.Row>
                <Table.Cell>{coupon_id}</Table.Cell>
                <Table.Cell>{usr_id}</Table.Cell>
                <Table.Cell>{description}</Table.Cell>
                <Table.Cell>{date.toLocaleDateString()}</Table.Cell>
                <Table.Cell><Button onClick={edit}>Edit</Button></Table.Cell>
            </Table.Row>

    )
}