import React, {useState} from "react";
import {Button, Form, Modal} from 'semantic-ui-react';
// import 'semantic-ui-css';
import Axios from "axios";

export default function CouponModal(props) {
    const [open, setOpen] = useState(false);
    const [couponId, setCouponId] = useState('');
    const handleOpen=()=> setOpen(true);
    const handleClose = ()=> setOpen(false);

    const handleSubmit=()=> {
        console.log(couponId);
        console.log("submit");
        //axios to post to backend for use coupon
        //the backend will handle the use of coupon
        //on success update the total price on the cart page;
    }
    return (
        <Modal
            trigger={<Button onClick={handleOpen}>Use Coupon</Button>}
            open={open}
            onClose={handleClose}
            size='tiny'
            >
                <Modal.Header>Use coupon</Modal.Header>
                <Modal.Content>
                   <Form onSubmit={handleSubmit}>
                       <Form.Field>
                           <label>Type coupon id</label>
                           <Form.Input
                            name="coupon"
                            value={couponId}
                            onChange={(e)=>setCouponId(e.target.value)}
                            />
                       </Form.Field>
                       <Form.Button content="submit">Use</Form.Button>
                   </Form> 
                </Modal.Content>
            </Modal>

    )
    
}


