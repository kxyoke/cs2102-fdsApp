import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button, Grid, Segment, Table } from 'semantic-ui-react'
import CustomDatePicker from './CustomDatePicker'
import ResUtils from '../../restaurant_staff/components/utils/utils'
import Utils from './utils/utils'
import axios from 'axios';

export default function PromoForm(props) {
    const { isEdit, promo } = props;

    const [pid, setPid] = useState(null);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState([]);
    const [promoType, setPromoType] = useState('delivery');
    const [discountType, setDiscountType] = useState('dollars');
    const [discountValue, setDiscountValue] = useState(null);
    const history = useHistory();

    useEffect(() => {
        if (isEdit) {
            const {pid, description, start_day, end_day} = props.promo;
            var promoProps = Utils.fdsPromoParser(description);
            var promoDesc = Utils.getPromoDesc(promoProps.promoType, promoProps.discountType, promoProps.discountValue);

            setPid(pid)
            setStartDate(new Date(start_day))
            setEndDate(new Date(end_day))
            setDescription(promoDesc)
        }
    }, [props])

    function submit() {
        const reqBody = {
            pid: pid,
            start_day: ResUtils.formatDateString(startDate),
            end_day: ResUtils.formatDateString(endDate),
            promoType: promoType,
            discountType: discountType,
            discountValue: discountValue
        }

        if (isEdit) {
            axios.put('/api/fdsManager/promos/' + pid, reqBody)
                .then(res => {
                    if (res.status === 200) {
                        history.push('/fdsManager/promos/');
                    }
                })
                .catch(err => {
                    alert(err.response.data);
                    console.log(err);
                });
        } else {
            axios.post('/api/fdsManager/promos', reqBody)
                .then(res => {
                    if (res.status === 200) {
                        history.push('/fdsManager/promos/');
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
                        <Table textAlign='center'>
                            <Table.Header>
                                <Table.HeaderCell>Promotion ID</Table.HeaderCell>
                                <Table.HeaderCell>Description</Table.HeaderCell>
                                <Table.HeaderCell>Start Date</Table.HeaderCell>
                                <Table.HeaderCell>End Date</Table.HeaderCell>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{pid}</Table.Cell>
                                    <Table.Cell>{description}</Table.Cell>
                                    <Table.Cell>{startDate.toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{endDate.toLocaleDateString()}</Table.Cell>
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
                            label='Start Date and Time' 
                            control={CustomDatePicker}
                            originalDate={startDate}
                            onChange={date => setStartDate(date)}
                        />
                        <Form.Field required 
                            label='End Date and Time' 
                            control={CustomDatePicker}
                            originalDate={endDate}
                            onChange={date => setEndDate(date)}
                        />
                    </Form.Group>
                    <Form.Field required label='Promotion type' control='select' onChange={e => setPromoType(e.target.value)}>
                        <option value='delivery'>Free Delivery</option>
                        <option value='discount'>First Time Discount</option>
                    </Form.Field>
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
                </Form>
            </Grid.Row>
            <Grid.Row>
                <Button primary onClick={submit}>Confirm</Button>
            </Grid.Row>
        </Grid>
    )
}