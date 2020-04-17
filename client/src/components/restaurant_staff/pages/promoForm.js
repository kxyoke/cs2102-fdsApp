import React from 'react'

import Header from '../layouts/header';

import PromoForm from '../components/res_promoForm.js'

export default function ResPromoForm(props) {
    const { isAdd, promo } = props.location.state

    return (
      <div>
        <Header/>
        <PromoForm isAdd={isAdd} promo={promo}/>
      </div>
    )
}

