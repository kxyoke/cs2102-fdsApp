import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from "../../logoutButton";
import CartButton from './cartButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function Header() {

    return (
       
           
            <nav class="navbar navbar-dark bg-dark">
                <a href ="/customer" class="navbar-brand">Food Deliver</a>
                
                <div class="col align-self-left"> 
                    <NavLink style={linkStyle} to='/customer'>Home</NavLink> | 
                    <NavLink style={linkStyle} to='/customer/order'>My Orders</NavLink> | 
                    <NavLink style={linkStyle} to='/customer/reviews'>My Reviews</NavLink> | 
                    {' '}
                    <Dropdown style={linkStyle} text='Account' pointing className='link item'>
                        <Dropdown.Menu>
                            <Dropdown.Item>
                            <Link style={dropLinkStyle} to='/customer/coupon'>Coupons</Link>
                                </Dropdown.Item>
                            <Dropdown.Item>
                                <Link style={dropLinkStyle} to='/customer/address'>Address</Link>
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Link style={dropLinkStyle} to='/customer/setting'> Settings</Link>
                            </Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>
                            <Dropdown.Item>
                            <LogoutButton></LogoutButton>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div> 
                <div class="row">
                <div class="col-md-auto">
                    <CartButton/>
                </div>
                </div>
                
                </nav>
      
       
    )
}


const linkStyle = {
    color:'#fff',
    textDecoration:'none'
}

const dropLinkStyle = {
    color:'#000',
    textDecoration:'none'


}

export default Header

