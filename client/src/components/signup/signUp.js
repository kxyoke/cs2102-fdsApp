import React, { useState, useEffect } from "react";
import Select from 'react-select';
import { Button, FormGroup, FormControl, ControlLabel, Form } from "react-bootstrap";
import "./signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function SignUp(props) {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        axios.get('/api/signup/restaurant')
            .then(res => {
                if (res.status == 200) {
                    setRestaurants(res.data)
                }
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");
    const [identity, setIdentity]= useState("");
    const [riderType, setRiderType] = useState('');
    const [resName, setResName] = useState('');
    const [min_amt, setMinAmt] = useState(20);
    const [resAddress, setResAddress] = useState('');

    const [res_id, setRid] = useState('');
    const [isUnderExistingRes, setIsExistingRes] = useState(false);

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
          alert("Please register or select your restaurant.");
        }
    }

    function validateCustomer() {
          return username.length > 0 && password.length > 0 
          && password2 ===password ;
    }
    function validateDeliveryRider() {
          return username.length > 0 && password.length > 0 
          && password2 ===password && (riderType === 'full' || riderType === 'part')
    }
    function validateResStaff() {
          return username.length > 0 && password.length > 0 
          && password2 ===password && resName.length > 0
          && min_amt !=='' && resAddress.length>0
    }

    function validateForm() {
      switch (identity) {
        case "customer":
            return validateCustomer()
        case "restaurantStaff":
            return validateResStaff()
        case 'deliveryRider':
            return validateDeliveryRider()
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
                    resAddress:resAddress,
                    res_id: res_id,
                    isNewRes: !isUnderExistingRes
                  })
          .then(res=>{
            console.log(res);
            setPassword('');
            if(res.status === 200) {
              alert("Sign up successful! Try logging in now!");
              props.history.push('/');
            } else {
                alert(res.data)
            }
        })
        .catch(err => {
          if(err.response.status === 422) {
            console.log(err.response.data);
            setMessage("Username is taken!")
            setPassword('');
            setPassword2('');
          } else if (err.response.status === 423) {
              setMessage("Restaurant name is taken!")
              setPassword('')
              setPassword2('')
          }
        })

      }

    function setResDetails(res) {
        setRid(res.res_id)
        setResName(res.rname)
        setMinAmt(res.min_amount)
        setResAddress(res.address)
    }
    function resDetailsForm() {
        return (
            <div>
            {isUnderExistingRes ? (
                <Select placeholder = {<div>Select your restaurant</div> } 
                  onChange = {e => setResDetails(e.value)} 
                  options={restaurants.map( r => ({value: r, label: r.rname}) )} 
                  required/>
            ) : (
                <form>
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
            )}
            </div>
        )
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
              ? <div>
                <div class='form-group form-check'>
                  <input type='checkbox' class='form-check-input' id='isSelectRes'
                    checked={isUnderExistingRes}
                    onChange={e => setIsExistingRes(e.target.checked)}
                    />
                  <label class='form-check-label' for='isSelectRes'> Select existing restaurant instead.</label>
                </div>
                  {resDetailsForm()}
                </div>
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

