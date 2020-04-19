import React, {useEffect, useState} from "react";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import SideBar from "./SideBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";
import { Link } from 'react-router-dom';
import Button from "@material-ui/core/Button";
import {Col, Form, FormGroup} from "react-bootstrap";
import Select from "react-select";
import Row from "react-bootstrap/lib/Row";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    choices: {
        zIndex: 1000,
    }
}));

function convertIfNull(variable) {
    if (variable == null) {
        return "-";
    } else {
        return new Date (variable).toLocaleString();
    }
}

export default function RSummary(props) {
    const classes = useStyles();
    const urlDeliveries = '/api/deliveryRider/summary/orders';
    const urlHours = '/api/deliveryRider/summary/hours';
    const urlSalary = '/api/deliveryRider/summary/salary';
    const [message, setMessage] = useState("");
    const [filter, setFilter] = useState([0,0,0,0]);
    const [deliveriesCount, setDeliveriesCount] = useState(0);
    const [deliveries, setDeliveries] = useState([]);
    const [salary, setSalary] = useState(0);
    const [workingHours, setWorkingHours] = useState(0);
    const [deliveryFee, setDeliveryFee] = useState(0);

    const months = [
        {value: "0", label: 'Select the month'},
        {value:"1", label: 'Month 1'},
        {value:"2", label:'Month 2'},
        {value:"3", label:'Month 3'},
        {value:"4" , label:'Month 4'},
        {value:"5" , label:'Month 5'},
        {value:"6" , label:'Month 6'},
        {value:"7" , label:'Month 7'},
        {value:"8" , label:'Month 8'},
        {value:"9" , label:'Month 9'},
        {value:"10" , label:'Month 10'},
        {value:"11" , label:'Month 11'},
        {value:"12" , label:'Month 12'}
    ];

    const weeks = [
        {value: "0", label: 'Select the month'},
        {value:"1", label: 'Week 1'},
        {value:"2", label:'Week 2'},
        {value:"3", label:'Week 3'},
        {value:"4" , label:'Week 4'}
    ];

    function updateIdentity(e, no)  {
        setMessage('');
        const newIds = filter.slice();//copy the array
        newIds[no] = e.value;
        setFilter(newIds); //set the new state
        console.log(filter);
    }


    function handleSubmit(event) {
        event.preventDefault();
        if (filter.includes(0)) {
            setMessage('Please ensure all options are chosen')
        } else if (filter[0] > filter[2] || (filter[0] === filter[2] && filter[1] > filter[3])){
            setMessage('Please ensure start date is smaller than end date')
        } else {
            const fetchDataDelivery = async () => {
                await axios.get(urlDeliveries, {
                    params: {
                        filter: filter
                    }
                }).then(res=> {
                        if(res.data.length > 0) {
                            setDeliveriesCount(res.data.length);
                            setDeliveries(res.data);
                            var initialDeliveryFee = 0;
                            for (var i = 0; i < res.data.length; i++) {
                                initialDeliveryFee = initialDeliveryFee + res.data[i].getfiltereddeliveries.delivery_fee;
                            }
                            setDeliveryFee(initialDeliveryFee);
                            console.log(initialDeliveryFee);
                        }
                });
            };
            const fetchDataSalary = async () => {
                await axios.get(urlSalary)
                    .then(res=> {
                        if(res.data.length > 0) {
                            setSalary(res.data[0].getridersalary);
                        }
                    });
            };
            const fetchWorkingHours = async () => {
                await axios.get(urlHours, {
                    params: {
                        filter: filter
                    }
                }).then(res=> {
                    if(res.data.length > 0) {
                        setWorkingHours(res.data[0].getfilteredworkinghours);
                    }
                });
            };
            fetchDataDelivery();
            fetchDataSalary();
            fetchWorkingHours();
        }

    }

    return(
        <div>
            <div className={classes.root}>
                <SideBar/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <h1>Summary</h1>
                    <Container maxWidth="lg" >
                        <div className="container">
                            <div className="row justify-content-md-center">

                                {message.length > 0 ?
                                    <div className="alert alert-danger" role="alert">
                                        <p className="text-center">
                                            <strong>{message}  </strong>
                                        </p>
                                    </div>
                                    : null
                                }

                            </div>
                        </div>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                    <Form onSubmit={handleSubmit} >
                                        <Row>
                                            <Col xs={3} md={3} lg={3}>
                                                Start Month
                                                <FormGroup className = {classes.choices}>
                                                    <Select placeholder={<div>Select a Month</div>}  onChange = {(e) => updateIdentity(e,0)}  options={months} required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={3} md={3} lg={3}>
                                                Start Week
                                                <FormGroup>
                                                    <Select placeholder={<div>Select a Week</div>}  onChange = {(e) => updateIdentity(e,1)}  options={weeks} required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={3} md={3} lg={3}>
                                                End Month
                                                <FormGroup>
                                                    <Select placeholder={<div>Select a Month</div>}  onChange = {(e) => updateIdentity(e,2)}  options={months} required/>
                                                </FormGroup>
                                            </Col>
                                            <Col xs={3} md={3} lg={3}>
                                                End Week
                                                <FormGroup>
                                                    <Select placeholder={<div>Select a Week</div>}  onChange = {(e) => updateIdentity(e,3)}  options={weeks} required/>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} md={12} lg={12} >
                                                <Button style={{alignSelf:'center'}}  type="submit">
                                                    Filter
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                <Paper className={classes.paper}>
                                    <h2>Total Deliveries within this Period: {deliveriesCount}</h2>
                                    <h2>Total Delivery Fee earned within this period: {deliveryFee}</h2>
                                    <Table size="lg">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Order ID</TableCell>
                                                <TableCell>Order Time</TableCell>
                                                <TableCell>Delivery Fee</TableCell>
                                                <TableCell>Link</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {deliveries.map((content) =>
                                                <TableRow>
                                                    <TableCell>{content.getfiltereddeliveries.order_id}</TableCell>
                                                    <TableCell>{convertIfNull(content.getfiltereddeliveries.place_order_time)}</TableCell>
                                                    <TableCell>{content.getfiltereddeliveries.delivery_fee}</TableCell>
                                                    <TableCell><Link to={{ pathname: '/deliveryRider/getDeliveryDetails', state: content.getfiltereddeliveries }}>More Details</Link></TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Paper classes={classes.paper}>
                            <h2>Total Monthly Salary: {salary} </h2>
                        </Paper>
                        <Paper classes={classes.paper}>
                            <h2>Total Working Hours: {workingHours} </h2>
                        </Paper>
                    </Container>
                </main>
            </div>
        </div>

    )
}

