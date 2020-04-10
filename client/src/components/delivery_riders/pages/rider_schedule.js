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
import Moment from 'moment';

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
    const [schedule, setSchedule] = useState(Array.from({length: 7},()=>
        []));
    const timeRange = [];
    for (var i = 10; i < 22; i++) {
        var exacttime = i + ":00";
        timeRange.push(exacttime);
    }
    useEffect( ()=> {
        const fetchData = async () => {
            await axios.get(url)
                .then(res=> {
                    if(res.data.length > 0) {
                        var twoDArray = [
                            ["1", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["2", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["3", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["4", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["5", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["6", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["7", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                        ]
                        for (var k = 0; k < res.data.length; k++) {
                            console.log(k);
                            console.log(res.data);
                            var emptyArray = [];
                            var format = 'hh:mm';
                            var beforeTime1 = Moment(res.data[k].start_time1, format);
                            var afterTime1 = Moment(res.data[k].end_time1, format);
                            var beforeTime2 = Moment(res.data[k].start_time2, format);
                            var afterTime2 = Moment(res.data[k].end_time2, format);
                            emptyArray.push(res.data[k].day);
                            for (var curtime = 10; curtime < 22; curtime++) {
                                var time = Moment(curtime,format);
                                if (time.isBetween(beforeTime1,afterTime1) || time.isBetween(beforeTime2,afterTime2)
                                || time.isSame(beforeTime1) || time.isSame(beforeTime2)) {
                                    emptyArray.push("true");
                                } else {
                                    emptyArray.push('-');
                                }
                            }
                            twoDArray[res.data[k].day - 1] = emptyArray;
                        }

                        setSchedule(twoDArray);
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
                    <h1>Work Schedule</h1>
                    <Container maxWidth="lg" >
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12} lg={12}>
                                <Paper className={clsx(classes.paper, 24)}>
                                    <Table size="lg">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Day</TableCell>
                                                {timeRange.map( (exacttime) => (
                                                        <TableCell> {exacttime} </TableCell>
                                                    )
                                                )}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {schedule.map( (exacttime) =>
                                                 <TableRow>
                                                     {exacttime.map( (exactvalue) => exactvalue === "true" ?
                                                        <TableCell>Working</TableCell> :
                                                        <TableCell>{exactvalue}</TableCell> )}
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

