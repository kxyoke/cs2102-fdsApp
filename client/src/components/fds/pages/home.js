import React, { Component } from 'react';
import LogoutButton from '../../logoutButton';

export default class FHome extends Component {

    render() {
        return(
            <div>
            <h1>FDS Home page</h1>
            <LogoutButton/>
            </div>
        )
    }
}