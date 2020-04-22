import React from 'react'
import HeaderMenu from '../layout/headerMenu'
import PromoForm from '../components/promoForm'
import { Header, Table } from 'semantic-ui-react'
import axios from 'axios';

export default function FPromoEdit(props) {
    const {isEdit, promo} = props.location.state
    
    return(
        <div className="PromoEdit" style={{textAlign:'center'}}>
            <HeaderMenu/>
            {isEdit?
            <Header as='h1' textAlign='center'>Edit Promotion</Header>
            : <Header as='h1' textAlign='center'>Launch Promotion</Header>
            }
            <PromoForm isEdit={isEdit} promo={promo}/>
        </div>
    )
}