import React, { Component } from 'react';
import Header from './layout/header';
import IdentityOptions from './login_identity_options';

class LoginHome extends Component {

    render() {
        return (
            <div className="HomeBeforeLogin">
              <Header />
              <h1>Select identity to login with:</h1>
              <IdentityOptions />
            </div>
        )
    }

}

export default LoginHome;

