import React, { Component } from 'react'
import Header from '../layout/header'

export default class CCoupons extends Component {

    render() {
        return(
            <div>
            <Header/>
             <div className="MyCoupon">
                <ul>
                    <h4>Coupon 1...</h4>
                    <h4>Coupon 2...</h4>
                    <h4>Coupon 3...</h4>
                    <h4>Coupon 4...</h4>
                    <h4>Coupon 5...</h4>
                </ul>
            </div>
            </div>
        )
    }
}