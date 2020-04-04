import React, { Component } from 'react';

import LogoutButton from '../../logoutButton';

export default class RHome extends Component {

    render() {
        return(
            <div>
            <h1>Rider Home page</h1>
            <LogoutButton/>
            </div>
        )
    }
}