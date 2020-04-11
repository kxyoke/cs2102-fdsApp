import React, { useState, useEffect } from 'react'
import { Button, Container, Divider, Header, Segment, Form } from 'semantic-ui-react'

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
        setConfirmedRname(props.profile.rname)
        setConfirmedAddr(props.profile.address)
        setConfirmedMinAmt(props.profile.min_amount)

        setNewRname(props.profile.rname)
        setNewAddr(props.profile.address)
        setNewMinAmt(props.profile.min_amount)

    }, [props])


    function toggleEdit(e) {
        setEdit(!edit);
    }

    function submitForm(e) {
        setConfirmedRname(newRname)
        setConfirmedAddr(newAddr)
        setConfirmedMinAmt(newMinAmt)
        
        toggleEdit(e)
    }

    const ButtonConditional = () => (
        <Button.Group>
          <Button onClick={toggleEdit}>Cancel</Button>
          <Button.Or />
          <Button onClick={submitForm} positive>Save</Button>
        </Button.Group>
    )

    return (
      <div>
        {edit?
          <div className="formEdit_profile">
            <Header as='h2' dividing={true} textAlign="justified">Edit profile</Header>
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
              <Header as='h2'>My Current Profile <Button color='teal' style={{ marginBottom: '1em' }} onClick={toggleEdit}> Edit </Button></Header> 
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

