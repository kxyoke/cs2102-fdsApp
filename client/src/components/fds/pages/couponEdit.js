import React, { Component } from 'react'
import HeaderMenu from '../layout/headerMenu'
import CouponForm from '../components/couponForm'
import { Header } from 'semantic-ui-react'
import axios from 'axios';

export default function FCouponEdit(props) {
    const { isEdit, coupon } = props.location.state

    return(
        <div className="CouponEdit" style={{textAlign:'center'}}>
            <HeaderMenu/>
            {isEdit?
            <Header as='h1' textAlign='center'>Edit FDS Coupon</Header>
            : <Header as='h1' textAlign='center'>Offer FDS Coupon</Header>
            }
            <CouponForm isEdit={isEdit} coupon={coupon}/>
        </div>
    )
}