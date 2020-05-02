import React from 'react'
import HeaderMenu from '../layout/headerMenu'
import ProfileForm from '../components/profileForm'
import { Header } from 'semantic-ui-react'
import axios from 'axios';

export default function FProfileEdit(props) {
    const { isUsername } = props.location.state
    
    return(
        <div className="ProfileEdit" style={{textAlign:'center'}}>
            <HeaderMenu/>
            {isUsername?
            <Header as='h1' textAlign='center'>Change Username</Header>
            : <Header as='h1' textAlign='center'>Change Password</Header>
            }
            <ProfileForm isUsername={isUsername}/>
        </div>
    )
}