import React, {useEffect, useState} from 'react';
import { Link,Redirect } from 'react-router-dom'
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import SideBar from "./SideBar";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Pagination from "../../customers/components/pagination";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

function convertIfNull(variable) {
    if (variable == null) {
        return "-";
    } else {
        return new Date (variable).toLocaleString();
    }
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    manager: {
        [theme.breakpoints.down("sm")]: {
            width: "100%"
        },
        display: "inline-block"
    },
    fixedHeight: {
        height: 240,
    },
}));



export default function Dashboard() {
    const classes = useStyles();
    const url = '/api/deliveryRider/home/delivery' ;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const [currentDelivery, setCurrentDelivery] = useState("");
    useEffect( ()=> {
        const fetchData = async () => {
            await axios.get(url)
                .then(res=> {
                    if(res.data.length > 0) {
                        setCurrentDelivery(res.data[0]);
                    }
                });
        };
        fetchData()

    }, [])



    function displayOrder(props) {

        if (props === "") {
            return (
                <Container>
                    <div className="row justify-content-md-center">
                        <h4>You have no ongoing deliveries. </h4>
                        <Link to="/deliveryRider/getOrders">
                            <Button renderAs="button">
                                <span>Pick up an order here</span>
                            </Button>
                        </Link>
                    </div>

                </Container>

            )
        } else {
            return (
                <Container>
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
                        <TableRow>
                            <TableCell>{props.order_id}</TableCell>
                            <TableCell>{props.usr_id}</TableCell>
                            <TableCell>{convertIfNull(props.place_order_time)}</TableCell>
                            <TableCell>{convertIfNull(props.dr_leave_for_res)}</TableCell>
                            <TableCell>{convertIfNull(props.dr_arrive_res)}</TableCell>
                            <TableCell>{convertIfNull(props.dr_leave_res)}</TableCell>
                            <TableCell>{convertIfNull(props.dr_arrive_cus)}</TableCell>
                            <TableCell><Link to={{ pathname: '/deliveryRider/getDeliveryDetails', state: props }}>More Details</Link></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                    <div className="row justify-content-md-center">
                        <Button block bsSize="large"  style={{alignSelf:'center'}}   onClick={() => handleUpdateOrder()}>
                            Update next delivery time
                        </Button>
                    </div>
                </Container>
            )
        }
    }

    function handleUpdateOrder() {
        axios.post('/api/deliveryRider/updateOrder' , [currentDelivery.order_id],{
            headers: {
                "Content-Type" : "application/json",
            }
        }).then(res=> {
            if(res.status === 200) {
                const fetchData2 = async () => {
                    await axios.get(url)
                        .then(res=> {
                            if(res.data.length > 0) {
                                if (res.data[0].dr_arrive_cus === null) {
                                    setCurrentDelivery(res.data[0]);
                                    alert("You have updated the delivery time");
                                }
                            } else {
                                alert('You have completed the delivery');
                                setCurrentDelivery("");
                            }
                        });
                };
                fetchData2()
            }
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <div className={classes.root}>
            <SideBar/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="lg" className={classes.container}>
                    <div className="row justify-content-md-center">
                        <h1>Current Delivery</h1>
                    </div>
                    <Grid container spacing={3}>
                        {/* Chart */}
                        <Grid item xs={12} md={12} lg={12}>
                            <Paper className={50}>
                                {displayOrder(currentDelivery)}
                            </Paper>
                        </Grid>
                        {/* Recent Deposits */}
                        <Grid item xs={12} md={4} lg={3}>
                            <Paper className={fixedHeightPaper}>
                            </Paper>
                        </Grid>
                        {/* Recent Orders */}
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Box pt={4}>
                    </Box>
                </Container>
            </main>
        </div>
    );
}