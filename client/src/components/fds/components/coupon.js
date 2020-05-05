import React from 'react';
import { useHistory } from 'react-router-dom'
import {Button, Table} from 'semantic-ui-react'
import Utils from './utils/utils'

export default function Coupon(props) {
    const {coupon_group_id, description, expiry_date} = props.coupon;
    const date = new Date(expiry_date);
    const history = useHistory();
    var couponProps = Utils.fdsCouponParser(description);
    var couponDesc = Utils.getCouponDesc(couponProps.couponType, couponProps.discountType, couponProps.discountValue);

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
                <Table.Cell>{coupon_group_id}</Table.Cell>
                <Table.Cell>{couponDesc}</Table.Cell>
                <Table.Cell>{date.toLocaleDateString()}</Table.Cell>
                <Table.Cell><Button onClick={edit}>Edit</Button></Table.Cell>
            </Table.Row>

    )
}