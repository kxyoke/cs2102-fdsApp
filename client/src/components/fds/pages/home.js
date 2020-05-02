import React, { Component } from 'react'
import HeaderMenu from '../layout/headerMenu'
import LogoutButton from '../../logoutButton'
import { Header } from 'semantic-ui-react'
import axios from 'axios';

export default function FHome(props) {

    return(
        <div className="Home">
            <HeaderMenu/>
            <Header 
                as='h1' 
                textAlign='center'
                content='FDS Manager Homepage'
                subheader='View application statistics'
            />
        </div>
    )
}