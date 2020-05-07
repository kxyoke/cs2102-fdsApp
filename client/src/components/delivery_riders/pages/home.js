import React, { Component } from 'react';

import LogoutButton from '../../logoutButton';
import Header from "../layout/header";
import Dashboard from "./rider_dashboard";

export default class RHome extends Component {

    render() {
        return(
            <div className="Home">
            <div>
                <Dashboard/>
            </div>
            </div>
        )
    }
}