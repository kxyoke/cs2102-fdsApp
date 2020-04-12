import React, { Component } from 'react'
import Header from '../layout/header'
import LogoutButton from '../../logoutButton'
import axios from 'axios';

export default function FHome(props) {

    return(
        <div>
            <Header/>
            <h1>Manager Home page</h1>
        </div>
    )
}