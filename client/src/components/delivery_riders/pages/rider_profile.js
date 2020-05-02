import React, { useState, useEffect } from 'react'
import { Form,Button, FormGroup,FormControl, ControlLabel } from "react-bootstrap";

import axios from 'axios';
import SideBar from "./SideBar";
import {makeStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper/Paper";
import Grid from "@material-ui/core/Grid";

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
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
}));

export default function RiderProfile(props) {
    const [loading, setLoading] = useState(true);
    const [oldUsername, setOldUsername] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const classes = useStyles();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/deliveryRider/profile')
                .then(res=> {
                    console.log(res.data);
                    setOldUsername(res.data.username);
                    setLoading(false);
                })
        }

        fetchData();
    }, [])

    function changeUsername(event) {
        console.log("change username")
        axios.post("/api/deliveryRider/profile", {username:username})
            .then(res=> {

                alert(res.data);
                setOldUsername(username);
                setUsername('');
            }).catch(error=> {

            alert(error.response.data);
            setUsername('');
        })
    }
    function changePassword(event) {
        console.log("change password");
        axios.post("/api/deliveryRider/profile", {password:password})
            .then(res=> {
                alert(res.data);
                setPassword('')
                setPassword2('');
            }).catch(error => {
            alert(error.response.data);
            setPassword('');
            setPassword2('');
        })

    }
    function validUserName() {
        return oldUsername.trim() !== username.trim() && username.length>0;
    }
    function validPassword() {
        return password2 === password && password.length >0;
    }

    return(

        <div>
            <div className={classes.root}>
                <SideBar/>
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                        <div  className={classes.container}>
                            <span style={{color:'#5a5c69',  padding: '100px 30px', fontSize: '20px'}}>DashBoard</span>
                        </div>

                    {loading ? null :
                <Container maxWidth="lg">
                    <Paper className={classes.paper}>
                    <div >
                        {/* display of information?  */}
                        <div className="SignUp">

                            <Form >
                                <FormGroup controlId="username" bsSize="large">
                                    <ControlLabel> Username : {oldUsername} {'   '}  </ControlLabel> {'  '}
                                    <FormControl
                                        value={username}
                                        type="username"
                                        placeholder="New username"
                                        onChange={e => {
                                            setUsername(e.target.value)}}

                                    />
                                </FormGroup>
                                <div className="well" style={wellStyles}>
                                    <Button block bsStyle="link"
                                            disabled={!validUserName()}
                                            onClick={changeUsername}>
                                        Edit Username
                                    </Button>
                                </div>


                                <FormGroup controlId="Password" bsSize="large">
                                    <ControlLabel> Change Password : </ControlLabel>
                                    <FormControl
                                        value={password}
                                        type="password"
                                        placeholder="New password"
                                        onChange={e => {
                                            setPassword(e.target.value)}}

                                    />
                                </FormGroup>
                                <FormGroup controlId="Password2" bsSize="large">
                                    <ControlLabel> Confirm Password :</ControlLabel>
                                    <FormControl
                                        value={password2}
                                        type="password"
                                        placeholder="Enter your new password again"
                                        onChange={e => {
                                            setPassword2(e.target.value)}}
                                    />
                                </FormGroup>
                                <div className="well" style={wellStyles}>
                                    <Button block bsStyle="link"
                                            disabled={!validPassword()}
                                            onClick={changePassword}>
                                        Change Password
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                    </Paper>
                </Container>
            }
                </main>
        </div>
        </div>

    )

}

const wellStyles = { maxWidth: 200, margin: '0 auto 10px' };
const deleteStyles = { maxWidth: 400, margin: '0 auto 10px' };