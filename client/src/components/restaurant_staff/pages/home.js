import React, { Component } from 'react'
import LogoutButton from "../../logoutButton";

import Header from '../layouts/header';

export default class ResHome extends Component {
    
    render() {
        return(
            <div className="ResHome">
            <Header/>
            <h1>restaurant staff Home page: will show all orders for now</h1>
            <LogoutButton/>
            </div>
        )
    }
}
