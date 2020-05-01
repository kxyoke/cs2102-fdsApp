import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Utils from './utils/utils'

import { Form, Button, Message, Header } from 'semantic-ui-react'
import DatetimePicker from './utils/DatetimePicker'

const assert = require('assert')

export default function PromoForm(props) {
    const history = useHistory();

    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const { isAdd } = props
    const { res_id, pid, start_day, end_day, description } = props.promo

    const [selectedStartDate, setStartDate] = useState(today);
    const [selectedEndDate, setEndDate] = useState(tomorrow);
    const [minAmount, setMinAmount] = useState(0);
    const [isAbsoluteNotPercent, setPromoType] = useState(false);
    const [discount2Decimal, setDiscount] = useState(0);
    
    useEffect(() => {
        if (!isAdd) {
            setStartDate(new Date(start_day))
            setEndDate(new Date(end_day))
            setDescription(description)
        }
    }, [props])

    function setDescription(desc) {
        let typed = desc.split(':')
        assert(typed[0] == 'DEFAULT', "Promo not default promo. error.")
        // TODO: promo extensions with other types.

        let defaultProps = Utils.getDefaultPromoDescProps(desc)

        setMinAmount(defaultProps.minAmount)
        setPromoType(defaultProps.isAbs)
        setDiscount(defaultProps.discount)
    }

    const [hasStartDateError, setHasStartDateError] = useState(false)
    const [startDateError, setStartDateError] = useState(null)
    const [hasEndDateError, setHasEndDateError] = useState(false)
    const [endDateError, setEndDateError] = useState(null)
    const [hasMinAmtError, setHasMinAmtError] = useState(false)
    const [minAmtError, setMinAmtError] = useState(null)
    const [hasDiscountError, setHasDiscountError] = useState(false)
    const [discountError, setDiscountError] = useState(null)

    function setAllErrorsFalse() {
        setHasStartDateError(false);
        setHasEndDateError(false);
        setHasMinAmtError(false)
        setHasDiscountError(false)
    }

    function validate() {
        setAllErrorsFalse()
        if (selectedStartDate == null) {
            setStartDateError({ 
                content: 'Start date cannot be empty.', 
            })
            setHasStartDateError(true)
            return false
        }

        if (selectedEndDate == null) {
            setEndDateError({ 
                content: 'End date cannot be empty.', 
            })
            setHasEndDateError(true)
            return false
        } else if (selectedEndDate <= selectedStartDate) {
            setEndDateError({
                content: 'End date cannot be before Start date.',
            })
            setHasEndDateError(true)
            return false
        }

        if (!Utils.currencyRegex.test(minAmount) || minAmount < 0) {
            setMinAmtError({
                content: 'Please check your min. amount is valid and omit the $.'
            })
            setHasMinAmtError(true)
            return false
        }

        if (!Utils.currencyRegex.test(discount2Decimal)) {
            setDiscountError({
                content: 'Valid and up to 2 decimals without the $ please!'
            })
            setHasDiscountError(true)
            return false
        } else if (isAbsoluteNotPercent && discount2Decimal > minAmount) {
            setDiscountError({
                content: 'Are you sure you want to give them more discount than spent?'
            })
            setHasDiscountError(true)
            return false;
        } else if (!isAbsoluteNotPercent && 
            (discount2Decimal > 100 || discount2Decimal < 0)) {
            setDiscountError({
                content: 'Check your percentage discount!'
            })
            setHasDiscountError(true)
            return false;
        }
        
        return true
    }

    function submitForm(e) {
        console.log("startdate is " + Utils.formatDateString(selectedStartDate))
        const isValid = validate()
        if (isValid) {
            const reqBody = {
                pid: pid,
                description: Utils.getPromoDesc(minAmount, isAbsoluteNotPercent, discount2Decimal),
                start_day: Utils.formatDateString(selectedStartDate),
                end_day: Utils.formatDateString(selectedEndDate)
            }
            console.log(JSON.stringify(reqBody))

            if (isAdd) {
                axios.post('/api/restaurant/promos/all/' + res_id, reqBody)
                    .then(res => {
                        if (res.status == 200) {
                            returnToPromos()
                        } else {
                            alert('Submission unsuccessful. Please try again.')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            } else {
                axios.put('/api/restaurant/promos/specific/' + res_id + '/' + pid, reqBody)
                    .then(res => {
                        if (res.status == 200) {
                            returnToPromos()
                        } else {
                            alert('Submission unsuccessful. Plese try again.')
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
            }
        }
    }

    function returnToPromos() {
        history.push('/restaurant/promos')
    }

    return (
      <div>
        <Header as='h2' dividing={true} textAlign='center' style={{ paddingTop: '1em', paddingBottom: '1em', display: 'flex', justifyContent: 'center' }}>{isAdd? "Add a new promo" : "Edit promo " + pid }</Header>
        <div className='container' style={{ paddingTop: '1.5em' }}>
          <Message info visible>
            <Message.Header>Promotion period date format is in YYYY:MM:DD HH:mm:SS.</Message.Header>
            <p>You may wish to input your own dates instead.</p>
          </Message>
          
          <Form>
            <Form.Group widths='equal'>
              <Form.Field required label='Start Date/Time' control={DatetimePicker}
                defaultDate={selectedStartDate} onChange={date => setStartDate(date)} 
                error={hasStartDateError? startDateError : false}
                />
              <Form.Field required label='End Date/Time' control={DatetimePicker}
                defaultDate={selectedEndDate} onChange={date => setEndDate(date)} 
                error={hasEndDateError? endDateError : false}
                />
            </Form.Group>
            <Form.Group>
              <Form.Field required width={6}
                label='Min. spending to enjoy this promotion' control='input'
                defaultValue={minAmount} placeholder='omit $'
                onChange={ e => setMinAmount(e.target.value) } 
                error={hasMinAmtError? minAmtError : false} />
              <Form.Field required width={6} 
                label='Eligible customers will get' control='input'
                defaultValue={discount2Decimal} placeholder='up to 2 decimals'
                onChange={ e => setDiscount(e.target.value) }
                error={hasDiscountError? discountError : false} />
              <Form.Field required width={4}
                label='Promo type' control='select'
                defaultValue={isAbsoluteNotPercent}
                onChange={ e => setPromoType(e.target.value) } >
                <option value={true}>dollars off</option>
                <option value={false}>percent off</option>
              </Form.Field>
            </Form.Group>
          </Form>
          <Header style={{ display:'flex', justifyContent: 'center' }}>
            <Button type='submit' onClick={submitForm}> Confirm </Button>
          </Header>
        </div>
      </div>
    )
}

