import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button, Grid, Segment, Table } from 'semantic-ui-react'
import CustomDatePicker from './CustomDatePicker'
import axios from 'axios';

export default function CouponForm(props) {
    const {isEdit, coupon} = props;
    //const {coupon_id, usr_id, description, expiry_date} = props.coupon;

    const [couponId, setCouponId] = useState(null);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [description, setDescription] = useState([]);
    const [isFirstTime, setCouponType] = useState(null);
    const [isPercentage, setDiscountType] = useState(null);
    const [discountValue, setDiscountValue] = useState(0);
    const [targetCustomers, setTargetCustomers] = useState([]);
    const history = useHistory();

    useEffect(() => {
        if (isEdit) {
            const {coupon_id, usr_id, description, expiry_date} = props.coupon;
            setCouponId(coupon_id)
            setExpiryDate(new Date(expiry_date))
            setDescription(description)
        }
    }, [props])

    function submit() {
        if (isEdit) {
            axios.put('/api/fdsManager/coupons/' + couponId)
                .then(res => {
                    if (res.status == 200) {
                        history.push('/fdsManager/coupons/');
                    }
                })
                .catch(err => {
                    alert(err.response.data);
                    console.log(err);
                });
        } else {
            axios.post('/api/fdsManager/coupons')
                .then(res => {
                    if (res.status == 200) {
                        history.push('/fdsManager/coupons/');
                    }
                })
                .catch(err => {
                    alert(err.response.data);
                    console.log(err);
                });
        }
    }

    return (
        <Grid className="center aligned">
            {isEdit?
                <Segment basic>
                    <Grid.Row>
                        <Table>
                            <Table.Header>
                                <Table.HeaderCell>Coupon ID</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{couponId}</Table.Cell>
                                    <Table.Cell>{description}</Table.Cell>
                                    <Table.Cell>{expiryDate.toLocaleDateString()}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Segment>
            : null
            }
            <Grid.Row>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Field required 
                            label='Expiry Date and Time' 
                            control={CustomDatePicker}
                            originalDate={expiryDate}
                            onChange={date => setExpiryDate(date)}
                        />
                    </Form.Group>
                    <Form.Field required label='Coupon type' control='select' onChange={e => setCouponType(e.target.value)}>
                        <option value={true}>Discount</option>
                        <option value={false}>Free Delivery</option>
                    </Form.Field>
                    <Form.Group widths='equal'>
                        <Form.Field label='Discount type' control='select' onChange={e => setDiscountType(e.target.value)}>
                            <option value={true}>Percentage</option>
                            <option value={false}>Dollars</option>
                        </Form.Field>
                        <Form.Input
                            label='Discount value' 
                            placeholder='up to 2 decimals'
                            onChange={e => setDiscountValue(e.target.value)} 
                        />
                        <Form.Field label='Target Customers' control='select' onChange={e => setTargetCustomers(e.target.value)}>
                            <option value={true}>Inactive</option>
                            <option value={true}>Frequent</option>
                        </Form.Field>
                    </Form.Group>
                </Form>
            </Grid.Row>
            <Grid.Row>
                <Button primary onClick={submit}>Confirm</Button>
            </Grid.Row>
        </Grid>
    )
}