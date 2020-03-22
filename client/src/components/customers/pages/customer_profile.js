import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../layout/header'

export default class CProfile extends Component {

    render() {
        return(
            <div>
            <Header/>
             <div className="MyProfile">
                <ul>
                    <Link style={linkStyle} to='/customer/coupon'>Coupons</Link>
                </ul>
                <ul>
                    <Link style={linkStyle} to='/customer/address'>Address</Link>
                </ul>
                <ul>
                    <Link style={linkStyle} to='/customer/setting'> Setting</Link>
                </ul>
            </div>
            </div>
        )
    }
}

const linkStyle = {
    color:'#000',
    textDecoration:'none'


}