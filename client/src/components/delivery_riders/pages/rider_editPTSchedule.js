import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {Redirect} from "react-router";
import { Button, FormGroup, Col, FormControl, ControlLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import SideBar from "./SideBar";
import {makeStyles} from "@material-ui/core/styles";
import Moment from "moment";
import Test from "./test";
import TaskList from "./ScheduleList";

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

export default function PTEditSchedule(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <SideBar/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <div className="content">
                    <Test weekNum={props.location.state.weekNum}/>
                </div>
            </main>
        </div>
    );
}

/*
 * Adapted from:
 * https://serverless-stack.com/chapters/create-a-login-page.html
 *
 */

