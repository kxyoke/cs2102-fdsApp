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


function convertIfNull(variable) {
    if (variable == null) {
        return "-";
    } else {
        return variable;
    }
}

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

}));

export default function RDetailedDeliveries(props) {
    const classes = useStyles();
    console.log(props);
    const originaldelivery = props.location.state;
    const url = '/api/deliveryRider/orders/' + originaldelivery.order_id;
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


    return(
        <div>
            <div className={classes.root}>
                <SideBar/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <h1>Delivery Record</h1>
                    <Container maxWidth="lg" >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={clsx(classes.paper, 24)}>
                                    <h4>Order ID: {originaldelivery.order_id}</h4>
                                    <h4>Restaurant Name: {originaldelivery.rname}</h4>
                                    <h4>Restaurant Address: {originaldelivery.address}</h4>
                                    <h4>Order Time: {originaldelivery.place_order_time}</h4>
                                    <h4>Left for Restaurant Time: {convertIfNull(originaldelivery.dr_leave_for_res)}</h4>
                                    <h4>Arrive At Restaurant Time: {convertIfNull(originaldelivery.dr_arrive_res)}</h4>
                                    <h4>Collected Order Time: {convertIfNull(originaldelivery.dr_leave_res)}</h4>
                                    <h4>Delivered Order Time: {convertIfNull(originaldelivery.dr_arrive_cus)}</h4>
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

                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
            </div>
        </div>

    )
}

