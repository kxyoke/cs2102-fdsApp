import React, { Component } from 'react';
import Header from './layout/header';
import IdentityOptions from './login_identity_options';
import {Link} from 'react-router-dom';

class LoginHome extends Component {

    render() {
        return (
            <div className="HomeBeforeLogin">
              <Header />
              <h1>Select identity to login with:</h1>
              <IdentityOptions />
              <Link to='/signUp'>Sign Up</Link>
            </div>
        )
    }

}

export default LoginHome;

