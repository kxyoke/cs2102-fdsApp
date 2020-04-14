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
import {Link} from "react-router-dom";

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

export default function RDeliveries(props) {
    const classes = useStyles();
    const url = '/api/deliveryRider/deliveries/:riid' ;
    const [deliveries, setDeliveries] = useState([]);

    useEffect( ()=> {
        const fetchData = async () => {
            await axios.get(url)
                .then(res=> {
                    if(res.data.length > 0) {
                        setDeliveries(res.data);
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
                    <h1>Recent Deliveries</h1>
                    <Container maxWidth="lg" >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={clsx(classes.paper, 24)}>
                                    <Table size="lg">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Order ID</TableCell>
                                                <TableCell>User ID</TableCell>
                                                <TableCell>Order Time</TableCell>
                                                <TableCell>Left for Restaurant Time</TableCell>
                                                <TableCell>Arrive At Restaurant Time</TableCell>
                                                <TableCell>Collected Order Time</TableCell>
                                                <TableCell>Delivered Order Time</TableCell>
                                                <TableCell>Link</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {deliveries.map((content) =>
                                                <TableRow>
                                                    <TableCell>{convertIfNull(content.order_id)}</TableCell>
                                                    <TableCell>{convertIfNull(content.rusr_id)}</TableCell>
                                                    <TableCell>{convertIfNull(content.place_order_time)}</TableCell>
                                                    <TableCell>{convertIfNull(content.dr_leave_for_res)}</TableCell>
                                                    <TableCell>{convertIfNull(content.dr_arrive_res)}</TableCell>
                                                    <TableCell>{convertIfNull(content.dr_leave_res)}</TableCell>
                                                    <TableCell>{convertIfNull(content.dr_arrive_cus)}</TableCell>
                                                    <TableCell><Link to={{ pathname: '/deliveryRider/getDeliveryDetails', state: content }}>More Details</Link></TableCell>
                                                </TableRow>
                                            )}
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

