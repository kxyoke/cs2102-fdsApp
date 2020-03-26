import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export default function IdentityOptions() {

    return (
        <Grid fluid>
          <Row>
            <Col sm={6} md={3}>
              <Link to="/customer/login">
                <Image src="/assets/customer.png" width="100%" height="100%" />
              </Link>
            </Col>
            <Col sm={6} md={3}>
              <Link to="/restaurant/login">
                <Image src="/assets/restaurantStaff.png" width="100%" height="100%" />
              </Link>
            </Col>
            <Col sm={6} md={3}>
              <Link to="/deliveryRider/login">
                <Image src="/assets/deliveryRider.png" width="100%" height="100%" />
              </Link>
            </Col>
            <Col sm={6} md={3}>
              <Link to="/fdsManager/login">
                <Image src="/assets/fdsManager.png" width="100%" height="100%" />
              </Link>
            </Col>
          </Row>
        </Grid>
    )
}

