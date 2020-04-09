import React, {useEffect, useState} from "react";
import Header from '../layout/header'
import axios from "axios";
import { withStyles } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SideBar from "./SideBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

function preventDefault(event) {
    event.preventDefault();
}

const drawerWidth = 240;

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
    fixedHeight: {
        height: 240,
    },
}));

export default function RSchedule(props) {
    const classes = useStyles();
    const url = '/api/deliveryRider/schedule/:riid' ;
    const [schedule, setSchedule] = useState([]);
    useEffect( ()=> {
        const fetchData = async () => {
            await axios.get(url)
                .then(res=> {
                    if(res.data.length > 0) {
                        setSchedule(res.data);
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
                    <Container maxWidth="lg" className={classes.container}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={8} lg={9}>
                                <Paper className={clsx(classes.paper, classes.fixedHeight)}>
                                    <h1>Recent Orders</h1>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Day</TableCell>
                                                <TableCell align="right">Sale Amount</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {schedule.map((row) => (
                                                <TableRow key= {row.usr_id + row.day}>
                                                    <TableCell>{row.day}</TableCell>
                                                    <TableCell>{row.shift_id}</TableCell>
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

