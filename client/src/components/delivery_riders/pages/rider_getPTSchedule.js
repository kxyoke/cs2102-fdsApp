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
import {Tabs, Tab, Row, Col, Nav} from 'react-bootstrap';
import SimpleTabs from "./TabPanel";
function preventDefault(event) {
    event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
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

function createtwoDArray() {
    return [
        ["Monday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["Tuesday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["Wednesday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["Thursday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["Friday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["Saturday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
        ["Sunday", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-", "-"],
    ];
}
export default function RPTSchedule(props) {
    const classes = useStyles();
    const url = '/api/deliveryRider/parttimeschedule' ;
    const [schedule, setSchedule] = useState([createtwoDArray() ,createtwoDArray() ,createtwoDArray() ,createtwoDArray() ] );
    const timeRange = [];
    const [value, setValue] = React.useState(0);

    const handleSelect = (event, newValue) => {
        setValue(newValue);
    };

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
                        var presetSchedule = [createtwoDArray() ,createtwoDArray() ,createtwoDArray() ,createtwoDArray() ];
                        for (var k = 0; k < res.data.length; k++) {
                            var format = 'hh:mm';
                            var beforeTime1 = Moment(res.data[k].start_time, format);
                            var afterTime1 = Moment(res.data[k].end_time, format);
                            var dayOfWeek = res.data[k].dayofweek;
                            var actualweek = res.data[k].week;
                            console.log(actualweek)
                            for (var curtime = 10; curtime < 22; curtime++) {
                                var time = Moment(curtime,format);
                                if (time.isBetween(beforeTime1,afterTime1) || time.isSame(beforeTime1)) {
                                    presetSchedule[actualweek - 1][dayOfWeek - 1][curtime - 9] = "true";
                                }
                            }
                        }
                        setSchedule(presetSchedule);
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
                                <Paper className={classes.root}>
                                   <SimpleTabs schedule={schedule} timeRange = {timeRange} />
                                </Paper>
                            </Grid>
                        </Grid>

                    </Container>

                </main>
            </div>
        </div>

    )
}

