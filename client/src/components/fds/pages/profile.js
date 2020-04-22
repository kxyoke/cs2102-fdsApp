import React,{useState, useEffect} from 'react'
import HeaderMenu from '../layout/headerMenu'
import { Header } from 'semantic-ui-react'
import axios from 'axios';

export default function FProfile(props) {

    return(
        <div className="Profile">
            <HeaderMenu/>
            <Header 
                as='h1' 
                textAlign='center'
                content='User Profile'
                subheader='Manage your login details'
            />
        </div>
    )
}