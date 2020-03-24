import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export default function IdentityOptions() {

    return (
        <Grid fluid>
          <Row>
            <Col sm={6} md={3}>
              <Image src="/assets/customer.png" width="100%" height="100%" />
            </Col>
            <Col sm={6} md={3}>
              <Image src="/assets/restaurantStaff.png" width="100%" height="100%" />
            </Col>
            <Col sm={6} md={3}>
              <Image src="/assets/deliveryRider.png" width="100%" height="100%" />
            </Col>
            <Col sm={6} md={3}>
              <Image src="/assets/fdsManager.png" width="100%" height="100%" />
            </Col>
          </Row>
        </Grid>
    )
}

