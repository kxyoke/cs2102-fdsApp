import React from 'react';
import Utils from '../../fds/components/utils/utils'


export default function CouponItem(props) {
    const {coupon_id, description, expiry_date, is_used} = props.coupon;
    const date = new Date(expiry_date);
    const coupon = Utils.fdsCouponParser(description);
    const couponString = Utils.getCouponDesc(coupon.couponType, coupon.discountType, coupon.discountValue);
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
                <td>{couponString}</td>
                <td>{date.toLocaleDateString()}</td>
                {is_used
                ? <td> Used</td>
                :expired()
                    ? <td style={{color:"red"}}>expired</td>
                    : <td>Active</td>}
            </tr>
        </React.Fragment>

    )
}