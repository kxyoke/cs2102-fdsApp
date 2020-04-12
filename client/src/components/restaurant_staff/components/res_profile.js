import React, { useState, useEffect } from 'react'
import { Button, Container, Divider, Header, Segment, Form, Input } from 'semantic-ui-react'

import axios from 'axios';

export default function RProfile(props) {
    const [edit, setEdit] = useState(false);

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
        setEdit(!edit);
    }

    function submitForm(e) {
        setConfirmedRname(newRname)
        setConfirmedAddr(newAddr)
        setConfirmedMinAmt(newMinAmt)
    }

    useEffect(() => {
        if ((confirmedRname == rname && confirmedAddr == address && confirmedMinAmt == min_amount)
        || confirmedRname == '' || confirmedAddr == '' || confirmedMinAmt == ''
        || confirmedRname == null || confirmedAddr == null || confirmedMinAmt == null) {
            console.log("no change detected; not submitting to server")
        } else {
            
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
          <div className="formEdit_profile">
            <Header as='h2' dividing={true} textAlign="center" style={{ paddingTop: '1em', paddingBottom: '1em' }}>Edit profile</Header>
            <ButtonConditional />
            <div className="form">
              <Form>
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

