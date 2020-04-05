import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export default function IdentityOptions() {

    return (
      <React.Fragment>
        <Grid fluid>
          <Row>
            <Col sm={6} md={3}>
              <Link to={{pathname:"/login", about: {identity:'customer'}}}>
                <Image src="/assets/customer.png" width="100%" height="100%" />
              </Link>
            </Col>
            <Col sm={6} md={3}>
              <Link to={{pathname : "/login",about: {identity:'restaurant'}}}>
                <Image src="/assets/restaurantStaff.png" width="100%" height="100%" />
              </Link>
            </Col>
            <Col sm={6} md={3}>
              <Link to={{pathname:"/login", about: {identity:'deliveryRider'}}}>
                <Image src="/assets/deliveryRider.png" width="100%" height="100%" />
              </Link>
            </Col>
            <Col sm={6} md={3}>
              <Link to={{pathname:"/login", about: {identity:'fdsManager'}}}>
                <Image src="/assets/fdsManager.png" width="100%" height="100%" />
              </Link>
            </Col>
          </Row>
        </Grid>
      </React.Fragment>
    )
}

