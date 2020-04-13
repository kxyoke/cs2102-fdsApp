import React, { useState, useEffect } from 'react'
import { Button, Container, Divider, Header, Segment, Message, Grid, Form, Input } from 'semantic-ui-react'

import axios from 'axios';

export default function RProfile(props) {
    const [edit, setEdit] = useState(false);
    const [hasFormError, setHasFormError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const {res_id, rname, address, min_amount} = props.profile;

    const [newRname, setNewRname] = useState('');
    const [newAddr, setNewAddr] = useState('');
    const [newMinAmt, setNewMinAmt] = useState('');

    const [confirmedRname, setConfirmedRname] = useState('');
    const [confirmedAddr, setConfirmedAddr] = useState('');
    const [confirmedMinAmt, setConfirmedMinAmt] = useState(0);

    useEffect(() => {
        setConfirmedRname(rname)
        setConfirmedAddr(address)
        setConfirmedMinAmt(min_amount)

        setNewRname(rname)
        setNewAddr(address)
        setNewMinAmt(min_amount)

    }, [props])


    function toggleEdit() {
        setHasFormError(false);
        setEdit(!edit);
    }

    function submitForm(e) {
        setConfirmedRname(newRname)
        setConfirmedAddr(newAddr)
        setConfirmedMinAmt(newMinAmt)
    }

    function validateConfirmed() {
        if (confirmedRname == rname && confirmedAddr == address && confirmedMinAmt == min_amount) {
            return validationState.SUBMIT_NOUPDATE
        }
        if (confirmedRname == '') {
            setErrorMsg('Name cannot be empty!')
            return validationState.INVALID
        }
        if (confirmedAddr == '') {
            setErrorMsg('Address cannot be empty!')
            return validationState.INVALID
        }
        if (confirmedMinAmt == '') {
            setErrorMsg('Minimum amount cannot be empty!')
            return validationState.INVALID
        }
        const currencyRegex = /^[0-9]\d*(?:(\.\d{0,2})?)$/;
        if (!currencyRegex.test(confirmedMinAmt) || confirmedMinAmt < 0) {
            setErrorMsg('Minimum amount is in the wrong format! Also omit the $ sign.')
            return validationState.INVALID
        }

        if (confirmedRname == null || confirmedAddr == null || confirmedMinAmt == null) {
            console.log("all null???? should never happen... but ok, shouldnt have submitted yet")
            return validationState.NOCHANGE
        }
        return validationState.SUBMIT_UPDATE
    }

    const validationState = {
        SUBMIT_UPDATE: 'submit form',
        SUBMIT_NOUPDATE: 'redirect',
        NOCHANGE: 'nochange',
        INVALID: 'invalid'
    }

    useEffect(() => {
        const validity = validateConfirmed()

        switch (validity) {
            case validationState.SUBMIT_UPDATE:
                axios.put('/api/restaurant/' + res_id, {
                    rname: confirmedRname,
                    address: confirmedAddr,
                    min_amount: confirmedMinAmt
                })
                    .then(res => {
                        console.log(res)
                        if (res.status == 200) {
                            toggleEdit()
                        }
                    })
                    .catch(err => {
                        console.log(err)
                    });
                break
            case validationState.SUBMIT_NOUPDATE:
                if (edit) {
                    toggleEdit()
                }
                break
            case validationState.INVALID:
                setHasFormError(true)
            default:
                console.log('nothing will be done.')
        }

    }, [confirmedRname, confirmedAddr, confirmedMinAmt]);

    const ButtonConditional = () => (
        <Button.Group>
          <Button onClick={e => toggleEdit()}>Cancel</Button>
          <Button.Or />
          <Button onClick={submitForm} positive>Save</Button>
        </Button.Group>
    )

    return (
      <div>
        {edit?
          <div className="container">
            <Grid>
              <Grid.Row columns={2} verticalAlign='bottom'>
                <Grid.Column textAlign='right'>
                    <Header as='h2' textAlign="center" style={{ paddingTop: '1em', paddingBottom: '0.5em' }}>Edit profile</Header>
                </Grid.Column>
                <Grid.Column textAlign='center'>
                    <ButtonConditional />
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <Divider />
            <div className="form">
              <Form error>
                {hasFormError?
                <div><Message error content={errorMsg} header='Please check your inputs!' /></div>
                : <div></div>
                }
                <Form.Field>
                  <label>Restaurant name</label>
                  <input placeholder='rname pls'
                    defaultValue={confirmedRname}
                    onChange={ e => setNewRname(e.target.value) } />
                </Form.Field>
                <Form.Field>
                  <label>Restaurant address</label>
                  <input placeholder='addresshere'
                    defaultValue={confirmedAddr}
                    onChange={ e => setNewAddr(e.target.value) } />
                </Form.Field>
                <Form.Field>
                  <label>Min. spending required</label>
                  <input placeholder='in dollars; omit the $ sign'
                    defaultValue={confirmedMinAmt}
                    onChange={ e => setNewMinAmt(e.target.value) } />
                </Form.Field>
              </Form>
            </div>
          </div>
        : <div className="staticProfile">
            <Container style={{ paddingTop: '5em', paddingBottom: '5em' }} text>
              <Header as='h2'>My Current Profile <Button color='teal' style={{ marginBottom: '1em' }} onClick={e => toggleEdit()}> Edit </Button></Header> 
              <Divider section />
              <Segment attached>Restaurant name: {confirmedRname}</Segment>
              <Segment attached>RestaurantAddress: {confirmedAddr}</Segment>
              <Divider section />
              <Header as='h4'>Current settings</Header>
              <Segment attached>Min amount set: {confirmedMinAmt}</Segment>
            </Container>
        </div>
        }
      </div>
    )
}

