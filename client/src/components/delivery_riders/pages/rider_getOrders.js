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

export default function ROrders(props) {
    const classes = useStyles();
    const url = '/api/deliveryRider/orders';
    const [orders, setOrders] = useState([]);

    useEffect( ()=> {
        const fetchData = async () => {
            await axios.get(url)
                .then(res=> {
                    if(res.data.length > 0) {
                        console.log(res.data);
                        setOrders(res.data);
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
                    <h1>Current Orders</h1>
                    <Container maxWidth="lg" >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={clsx(classes.paper, 24)}>
                                    <Table size="lg">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Order ID</TableCell>
                                                <TableCell>Restaurant Name</TableCell>
                                                <TableCell>Restaurant Address</TableCell>
                                                <TableCell>Order Time</TableCell>
                                                <TableCell>Link</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        {console.log(orders)}
                                        <TableBody>
                                            {orders.map(orders => (
                                                <TableRow>
                                                    <TableCell>{orders.order_id}</TableCell>
                                                    <TableCell>{orders.rname}</TableCell>
                                                    <TableCell>{orders.address}</TableCell>
                                                    <TableCell>{orders.place_order_time}</TableCell>
                                                    <TableCell><Link to={{ pathname: '/deliveryRider/getOrderDetails', detailedOrders: orders }}>More Details</Link></TableCell>
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

