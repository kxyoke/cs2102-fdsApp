import React,{useState} from "react";
import Select from 'react-select';
import {Redirect} from "react-router";
import { Button, FormGroup, Col, FormControl, ControlLabel, Form } from "react-bootstrap";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [identity, setIdentity]= useState("");
    const [riderType, setRiderType] = useState('');
    const [resName, setResName] = useState('');
    const [min_amt, setMinAmt] = useState(20);
    const [resAddress, setResAddress] = useState('');

    const riders = [
      {value:'part', label:"Part-time rider"},
      {value:'full', label:"Full-time rider"}
    ];
    const options = [
        {value:"customer", label: 'Customer'},
        {value:"restaurantStaff", label:'Restaurant Staff'},
        {value:"deliveryRider", label:'Delivery Rider'}
    ];

    function updateIdentity(e)  {
        setMessage('');
        setIdentity(e.value);
        if(e.value === 'restaurantStaff') {
          alert("You will need to register restaurant at the same time");
        }
    }


    function validateForm() {
      switch (identity) {
        case "customer":
          return username.length > 0 && password.length > 0 
          && password2 ===password ;
        case "restaurantStaff":
          return username.length > 0 && password.length > 0 
          && password2 ===password && resName.length > 0
          && min_amt !='' && resAddress.length>0
        case 'deliveryRider':
          return username.length > 0 && password.length > 0 
          && password2 ===password && (riderType === 'full' || riderType === 'part')
        default:
          return false;

      }
    }

     function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/signup/' + identity,
                   {username: username,
                     password:password,
                    riderType:riderType,
                    resName: resName,
                    min_amt:min_amt,
                    resAddress:resAddress
                  })
          .then(res=>{
            console.log(res);
            setPassword('');
            if(res.status === 200) {
              alert("sign up successfully! You can login now");
              props.history.push('/');
            }
        })
        .catch(err => {
          if(err.response.status === 422) {
            console.log(err.response.data);
            setMessage("Username is taken!")
            setPassword('');
            setPassword2('');
          }
        })

      }

    return (
        
        <div className="SignUp">
        <div class ="container">
        <div class="row justify-content-md-center">
        
          { message.length > 0 ?
            <div class="alert alert-danger" role="alert" >
            <p class="text-center">
            <strong>{message}  </strong>
            </p>
            </div>
              : null
          }

          </div>
        </div>

          <Form onSubmit={handleSubmit}>
          <Select placeholder = {<div>Select your identity</div> } 
          onChange = {updateIdentity} options={options} required/>
          {identity === 'deliveryRider'?
          <div>
          <p> </p>
          <Select placeholder ={<div>Select rider type</div>}
          onChange = {(e)=>{
              setMessage('');
              setRiderType(e.value)}}
             options={riders} required/>
          </div>
          : null}
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={username}
                onChange={e => {
                  setMessage('');
                  setUsername(e.target.value)}}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={password}
                onChange={e => {setMessage('');
                setPassword(e.target.value)}}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="password2" bsSize="large">
              <ControlLabel>Enter your password again</ControlLabel>
              <FormControl
                value={password2}
                onChange={e=> {setMessage('');
                setPassword2(e.target.value)}}
                type="password"
              />
              {password === password2 &&password.length >0 &&password2.length>0
              ?<small>password are the same</small>
              : password2.length > 0
                ?<small >passwords are not the same</small>
                : null
              }
            </FormGroup>
              {identity === 'restaurantStaff'
              ? <form>
                <div class = 'form-row'>
                  <div class = 'form-group col-md-6'>
                  <FormGroup controlId="resName" bsSize="large">
                    <ControlLabel>Restaurant name</ControlLabel>
                    <FormControl
                      autoFocus
                      type="resName"
                      value={resName}
                      placeholder="Restaurant Name"
                      onChange={e => {setMessage('');
                      setResName(e.target.value)}}
                    />
                  </FormGroup>
 
                  </div>
                  <div class = 'form-group col-md-6'>
                  <FormGroup controlId="minimumSpending" bsSize="large">
                    <ControlLabel>Minimum spending ($) </ControlLabel>
                    <FormControl
                      autoFocus
                      type="minimumSpending"
                      value={min_amt}
                      onChange={e => {setMessage('');
                      setMinAmt(e.target.value)}}
                    />
                  </FormGroup>
                  </div>
                </div>

                <div>
                <FormGroup controlId="address" bsSize="large">
                <ControlLabel>address</ControlLabel>
                  <FormControl
                    value={resAddress}
                    onChange={e => {setMessage('');
                    setResAddress(e.target.value)}}
                    type="address"
                />
                </FormGroup>
                </div>
              </form>
              :null}
            

             
              <div>
                <div class="form-group form-check" >
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" required/>
                  <label class="form-check-label" for="exampleCheck1" > Agree to Terms and Conditions</label>
                </div>
          
              

              <Button block bsSize="large" disabled={!validateForm()} type="submit">
                Sign Up
              </Button>
            </div>
          </Form>
        </div>
    );
}

/*
 * Adapted from:
 * https://serverless-stack.com/chapters/create-a-login-page.html
 *
 */

