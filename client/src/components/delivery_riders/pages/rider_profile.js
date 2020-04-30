import React, { useState, useEffect } from 'react'
import { Button, Container, Divider, Header, Segment, Message, Grid, Form, Input } from 'semantic-ui-react'

import axios from 'axios';

export default function RiderProfile(props) {
    const [loading, setLoading] = useState(true);
    const [oldUsername, setOldUsername] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [oldCard, setOldCard] = useState('')
    const [card, setCard] = useState('');
    const [rewardPoint, setRewardPoint] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
            await Axios.get('/api/rider/profile')
                .then(res=> {
                    console.log(res.data);
                    setOldUsername(res.data.username);
                    setOldCard(res.data.cardnumber);
                    setLoading(false);
                })
        }

        fetchData();
    }, [])

    function changeUsername(event) {
        console.log("change username")
        Axios.post("/api/customer/profile", {username:username})
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
        Axios.post("/api/customer/profile", {password:password})
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
    function changeCard(event) {
        console.log("change card");
        Axios.post("/api/customer/profile", {card:card})
            .then(res=> {
                alert(res.data);
                setCard('');
            }).catch(error=> {
            alert(error.response);

            setCard('');
        })

    }
    function deleteAccount(event) {
        console.log("delete Account");
        Axios.post('/api/customer/delete').then(
            res=> {
                console.log(res.data);

            }
        )
    } function validUserName() {
        return oldUsername.trim() !== username.trim() && username.length>0;
    }
    function validPassword() {
        return password2 === password && password.length >0;
    }
    function validCard() {
        // TODO: check for card need
        return card !== oldCard && card.length >0;
    }
    return(

        <div>
            {loading ? null :
                <div >
                    <Header/>
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


                            <FormGroup controlId="card" bsSize="large">
                                <ControlLabel> Card : {oldCard} </ControlLabel>
                                <FormControl
                                    value={card}
                                    type="card"
                                    placeholder="New card number"
                                    onChange={e => {
                                        setCard(e.target.value)}}

                                />
                            </FormGroup>
                            <div className="well" style={wellStyles}>
                                <Button block bsStyle="link"
                                        disabled={!validCard()}
                                        onClick={changeCard}>
                                    update Card information
                                </Button>
                            </div>
                        </Form>


                        <div className="well" style={deleteStyles}>
                            <Button block bsStyle="danger"
                                    onClick={deleteAccount} >
                                Delete account
                            </Button>
                        </div>
                    </div>
                </div>
            }
        </div>

    )

}

const wellStyles = { maxWidth: 200, margin: '0 auto 10px' };
const deleteStyles = { maxWidth: 400, margin: '0 auto 10px' };