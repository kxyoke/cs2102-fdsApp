import React from 'react'
import { Button, Container, Divider, Grid, Header, Menu, Message, Segment, Table } from 'semantic-ui-react'

export default function RProfile(props) {
    const {res_id, rname, address, min_amount} = props.profile;

    return (
      <div>
        <Container style={{ paddingTop: '5em', paddingBottom: '5em' }} text>
          <Header as='h2'>My Current Profile</Header>
          <Divider section />
          <Segment attached>Restaurant name: {rname}</Segment>
          <Segment attached>RestaurantAddress: {address}</Segment>
          <Divider section />
          <Header as='h4'>Current settings</Header>
          <Segment attached>Min amount set: {min_amount}</Segment>
        </Container>
      </div>
    )
}

