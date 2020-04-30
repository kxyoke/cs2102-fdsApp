//NOT IN USED

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Header from '../layout/header'
//reward points inside here
//username => can be changed
//password => can change password
//card information
export default class CProfile extends Component {

    render() {
        return(
            <div>
            <Header/>
             <div class =" mx-auto" className="MyProfile">
                <ul>
                    <Link style={linkStyle} to='/customer/coupon'>Coupons</Link>
                </ul>
                <ul>
                    <Link style={LinkStyle} to='/customer/address'>Address</Link>
                </ul>
                <ul>
                    <Link style={LinkStyle} to='/customer/setting'> Setting</Link>
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