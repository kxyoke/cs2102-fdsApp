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
import {Button} from "react-bootstrap";


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
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
}));

export default function RDetailedOrders(props) {
    const classes = useStyles();
    const originalorder = props.location.state;
    const [message, setMessage] = useState("");
    const url = '/api/deliveryRider/orders/' + originalorder.order_id;
    const urlForUser = '/api/deliveryRider/pickup';
    const [detailedListOfItems, setDetailedListOfItems] = useState([]);
    useEffect( ()=> {
        const fetchData = async () => {
            await axios.get(url )
                .then(res=> {
                    if(res.data.length > 0) {
                        setDetailedListOfItems(res.data);
                    }
                });
        };
        fetchData()

    }, [])

    function handlePickUpOrder() {
        axios.post(url, [originalorder.order_id], {
                headers: {
                    "Content-Type" : "application/json",
                }
            }).then(res=> {
                console.log(res.data);
                if(res.status === 200) {
                    alert("You have picked up the order");
                }
            }).catch(err => {
                console.log(err);
                if(err.response.status === 422) {
                    setMessage("You already have a delivery that is in progress, please complete the delivery before picking up a new request");
                }
            });
    }

    return(
        <div>
            <div className={classes.root}>
                <SideBar/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <div class="row justify-content-md-center">

                        { message.length > 0 ?
                            <div class="alert alert-danger" role="alert" >
                                <p class="text-center">
                                    <strong>{message}  </strong>
                                </p>
                            </div>
                            : null
                        }

                    </div>
                    <Container maxWidth="lg" >
                        <div  className={classes.container}>
                            <span style={{color:'#5a5c69',  fontSize: '40px'}}>Order Details</span>
                        </div>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={clsx(classes.paper, 24)}>
                                    <h4>Order ID: {originalorder.order_id}</h4>
                                    <h4>Restaurant Name: {originalorder.rname}</h4>
                                    <h4>Restaurant Address: {originalorder.address}</h4>
                                    <h4>Order Time: {originalorder.place_order_time}</h4>
                                    <Table size="lg">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Order ID</TableCell>
                                                <TableCell>Order Item</TableCell>
                                                <TableCell>Quantity</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {detailedListOfItems.map(items => (
                                                <TableRow>
                                                    <TableCell>{items.id}</TableCell>
                                                    <TableCell>{items.name}</TableCell>
                                                    <TableCell>{items.qty}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                    <Button block bsSize="large"  onClick={() => handlePickUpOrder()}>
                                        Pick Up Order
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </div>

    )
}

