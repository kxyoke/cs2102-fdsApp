import React from 'react';

export default function CouponItem(props) {
    const {coupon_id, description, expiry_date, is_used} = props.coupon;
    const date = new Date(expiry_date);
    const expired = () => {
        const today = Date.now();
        if (date < today) {
            return true;

        } else {
            return false;
        }
    }


    const active = ()=> {
        if (is_used || expired()) {
            return {color:"grey"};
        } 
            
        return {}
    }
    
    return (
        <React.Fragment>
            <tr style = {active()}>
                <th scope="row">{coupon_id}</th>
                <td>{description}</td>
                <td>{date.toLocaleDateString()}</td>
                {is_used
                ? <td> Used</td>
                :expired()
                    ? <td style={{color:"red"}}>expired</td>
                    : <td>-</td>}
            </tr>
        </React.Fragment>

    )
}