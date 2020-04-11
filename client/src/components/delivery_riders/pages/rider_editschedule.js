import React, {useEffect, useState} from "react";
import Select from 'react-select';
import {Redirect} from "react-router";
import { Button, FormGroup, Col, FormControl, ControlLabel, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';
import SideBar from "./SideBar";
import {makeStyles} from "@material-ui/core/styles";
import Moment from "moment";

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

export default function FTEditSchedule(props) {
    const classes = useStyles();
    const url = '/api/deliveryRider/schedule/:riid';
    const [message, setMessage] = useState("");
    const [schedule, setSchedule] = useState(['0','0','0','0','0','0','0']);


    const shifts = [
        {value:"1", label: 'Shift 1 (10am to 2pm and 3pm to 7pm)'},
        {value:"2", label:'Shift 2 (11am to 3pm and 4pm to 8pm)'},
        {value:"3", label:'Shift 3 (12pm to 4pm and 5pm to 9pm)'},
        {value:"4" , label:'Shift 4 (1pm to 5pm and 6pm to 10pm)'}
    ];

    function updateIdentity(e, no)  {
        setMessage('');
        console.log(e.value);
        const newIds = schedule.slice();//copy the array
        newIds[no] = e.value;
        setSchedule(newIds); //set the new state
        console.log(schedule);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(schedule);
        axios.post(url,  schedule,   {
            headers: {
                "Content-Type" : "application/json",
            }
        }).then(res=>{
                console.log(res);
                if(res.status === 200) {
                    alert("sign up successfully! You can login now");
                }
            })
            .catch(err => {
                    console.log(err.response.data);

            })

    }



    return (
        <div className={classes.root}>
            <SideBar/>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <div className="SignUp">
                    <div className="container">
                        <div className="row justify-content-md-center">

                            {message.length > 0 ?
                                <div className="alert alert-danger" role="alert">
                                    <p className="text-center">
                                        <strong>{message}  </strong>
                                    </p>
                                </div>
                                : null
                            }

                        </div>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <FormGroup as={Col} sm={12}>
                            <Select placeholder={<div>Monday</div>}
                                    onChange = {(e) => updateIdentity(e,0)}   options={shifts} required/>
                        </FormGroup>

                        <FormGroup>
                            <Select placeholder={<div>Tuesday</div>}
                                    onChange = {(e) => updateIdentity(e,1)}   options={shifts} required/>
                        </FormGroup>

                        <FormGroup>
                            <Select placeholder={<div>Wednesday</div>}
                                    onChange = {(e) => updateIdentity(e,2)}   options={shifts} required/>
                        </FormGroup>

                        <FormGroup>
                            <Select placeholder={<div>Thursday</div>}
                                    onChange = {(e) => updateIdentity(e,3)}   options={shifts} required/>
                        </FormGroup>

                        <FormGroup>
                            <Select placeholder={<div>Friday</div>}
                                    onChange = {(e) => updateIdentity(e,4)}   options={shifts} required/>
                        </FormGroup>

                        <FormGroup>
                            <Select placeholder={<div>Saturday</div>}
                                    onChange = {(e) => updateIdentity(e,5)}   options={shifts} required/>
                        </FormGroup>

                        <FormGroup>
                        <Select placeholder={<div>Sunday</div>}
                                onChange = {(e) => updateIdentity(e,6)}   options={shifts} required/>
                         </FormGroup>

                        <Button block bsSize="large" type="submit">
                            Edit Schedule
                        </Button>

                    </Form>

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

