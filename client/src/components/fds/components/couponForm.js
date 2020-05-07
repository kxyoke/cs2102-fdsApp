import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button, Grid, Segment, Table } from 'semantic-ui-react'
import CustomDatePicker from './CustomDatePicker'
import ResUtils from '../../restaurant_staff/components/utils/utils'
import Utils from './utils/utils'
import axios from 'axios';

export default function CouponForm(props) {
    const { isEdit, coupon } = props;

    const [couponGroupId, setCouponGroupId] = useState(null);
    const [expiryDate, setExpiryDate] = useState(new Date());
    const [description, setDescription] = useState([]);
    const [couponType, setCouponType] = useState('delivery');
    const [discountType, setDiscountType] = useState('dollars');
    const [discountValue, setDiscountValue] = useState(0);
    const [targetCustomers, setTargetCustomers] = useState('inactive');
    const [customerActivity, setCustomerActivity] = useState(0);
    const history = useHistory();

    useEffect(() => {
        if (isEdit) {
            const {coupon_group_id, description, expiry_date} = props.coupon;
            var couponProps = Utils.fdsCouponParser(description);
            var couponDesc = Utils.getCouponDesc(couponProps.couponType, couponProps.discountType, couponProps.discountValue);

            setCouponGroupId(coupon_group_id)
            setExpiryDate(new Date(expiry_date))
            setDescription(couponDesc)
        }
    }, [props])

    function submit() {
        const reqBody = {
            coupon_group_id: couponGroupId,
            expiry_date: ResUtils.formatDateString(expiryDate),
            couponType: couponType,
            discountType: discountType,
            discountValue: discountValue,
            targetCustomers: targetCustomers,
            customerActivity: customerActivity
        }

        if (isEdit) {
            axios.put('/api/fdsManager/coupons/' + couponGroupId, reqBody)
                .then(res => {
                    if (res.status === 200) {
                        history.push('/fdsManager/coupons/');
                    }
                })
                .catch(err => {
                    alert(err.response.data);
                    console.log(err);
                });
        } else {
            axios.post('/api/fdsManager/coupons', reqBody)
                .then(res => {
                    if (res.status === 200) {
                        history.push('/fdsManager/coupons/');
                    }
                })
                .catch(err => {
                    alert(err.response.data);
                    console.log(err);
                });
        }
    }
    function valid() {
        return (couponType==="delivery"||(couponType==='discount' &&discountValue>0));
    }

    return (
        <Grid className="center aligned">
            {isEdit?
                <Segment basic>
                    <Grid.Row>
                        <Table textAlign='center'>
                            <Table.Header>
                                <Table.HeaderCell>Coupon Group ID</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{couponGroupId}</Table.Cell>
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
                        <option value='delivery'>Free Delivery</option>
                        <option value='discount'>Discount</option>
                    </Form.Field>
                    {couponType === 'discount'
                    ?
                    <Form.Group widths='equal'>
                        <Form.Field label='Discount type' control='select' onChange={e => setDiscountType(e.target.value)}>
                            <option value='dollars'>Dollars</option>
                            <option value='percentage'>Percentage</option>
                        </Form.Field>
                        <Form.Input
                            label='Discount value' 
                            placeholder='up to 2 decimals'
                            onChange={e => setDiscountValue(e.target.value)} 
                        />
                    </Form.Group>
                    : null}
                    {!isEdit?
                    <Form.Group widths='equal'>
                        <Form.Field required label='Target Customers' control='select' onChange={e => setTargetCustomers(e.target.value)}>
                            <option value='inactive'>Inactive</option>
                            <option value='active'>Active</option>
                        </Form.Field>
                        <Form.Input required
                            label='Customer Activity' 
                            placeholder='for the past XX month/s'
                            onChange={e => setCustomerActivity(e.target.value)} 
                        />
                    </Form.Group>
                    : null
                    }
                </Form>
            </Grid.Row>
            <Grid.Row>
                <Button primary disabled={!valid()} onClick={submit}>Confirm</Button>
            </Grid.Row>
        </Grid>
    )
}
