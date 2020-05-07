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
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import Row from "react-bootstrap/lib/Row";
import {Col, Form} from "react-bootstrap";

function preventDefault(event) {
    event.preventDefault();
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
    container: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    special: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2.5),
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

    function convertToDay(dayNumber) {
        switch(dayNumber) {
            case 1:
                return "Monday";
            case 2:
                return "Tuesday";
            case 3:
                return "Wednesday";
            case 4:
                return "Thursday";
            case 5:
                return "Friday";
            case 6:
                return "Saturday";
            case 7:
                return "Sunday";
        }
    }

    useEffect( ()=> {
        const fetchData = async () => {
            console.log(props);
            await axios.get(url)
                .then(res=> {
                    if(res.data.length > 0) {
                        var twoDArray = [
                            ["Monday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["Tuesday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["Wednesday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["Thursday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["Friday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["Saturday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                            ["Sunday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
                        ]
                        for (var k = 0; k < res.data.length; k++) {
                            var emptyArray = [];
                            var format = 'hh:mm';
                            var beforeTime1 = Moment(res.data[k].start_time1, format);
                            var afterTime1 = Moment(res.data[k].end_time1, format);
                            var beforeTime2 = Moment(res.data[k].start_time2, format);
                            var afterTime2 = Moment(res.data[k].end_time2, format);
                            emptyArray.push(convertToDay(res.data[k].day));
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
                    <Container maxWidth="lg" >
                        <div  className={classes.container}>
                            <span style={{color:'#5a5c69',  fontSize: '40px'}}>Work Schedule</span>
                        </div>
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
                            <Row align={"center"}>
                                <Col xs={12} md={12} lg={12} className={classes.special}>
                                    <Link to="/deliveryRider/editSchedule">
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            className={classes.button}
                                            startIcon={<EditIcon/>}
                                            renderAs="button"
                                        >
                                            <span>Edit Schedule</span>
                                        </Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Grid>
                    </Container>

                </main>
            </div>
            </div>

        )
}

