import React from 'react'

import Header from '../layouts/header';

import PromoForm from '../components/res_promoForm.js'
import Utils from '../components/utils/utils'

export default function ResPromoForm(props) {
    const { isAdd, promo } = props.location.state

    const desc = isAdd? {minAmount:0, discount:0, isAbs:false} 
        : Utils.getDefaultPromoDescProps(promo.description)
    
    return (
      <div>
        <Header/>
        <PromoForm isAdd={isAdd} promo={promo} desc={desc}/>
      </div>
    )
}

