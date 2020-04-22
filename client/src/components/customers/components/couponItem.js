import React from 'react';

export default function CouponItem(props) {
    const {coupon_id, description, expiry_date} = props.coupon;
    const date = new Date(expiry_date);
    
    return (
        <React.Fragment>
            <tr>
                <th scope="row">{coupon_id}</th>
                <td>{description}</td>
                <td>{date.toLocaleDateString()}</td>
            </tr>
        </React.Fragment>

    )
}