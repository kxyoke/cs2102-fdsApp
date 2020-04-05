import React,{useState} from "react";
import Select from 'react-select';
import {Redirect} from "react-router";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./layout/signup.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

export default function SignUp(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [identity, setIdentity]= useState("");
    const options = [
        {value:"customer", label: 'Customer'},
        {value:"restaurantStaff", label:'Restaurant Staff'},
        {value:"deliveryRider", label:'Delivery Rider'}
    ];

    function updateIdentity(e)  {
        console.log(e.value);
        setIdentity(e.value);
    }
    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

     function handleSubmit(event) {
        event.preventDefault();
        axios.post('/api/signup/'+identity, {username: username, password:password}).then(res=>{
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
          }
        })
        
        
        //     console.log(res)
        //     props.history.push('/')
        //   }
        // })
        // .catch(err => {
        //   if(err.response){
        //     console.log(err.response.status);
            
        //     if (err.response.status === 401) {
        //       console.log(err.response.data);
        //       alert(err.response.data)
              
        //     } else {
        //       console.log(err)
              
        //     }
        //     props.history.push('/')
        //   }else if (err.request) {
        //     console.log(err.request);
        //   }else {
        //   console.log('Error', err.message);
        //   }
          
          
        // })
    

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
          <form onSubmit={handleSubmit}>
          <Select placeholder = {<div>Select your identity</div> } 
          onChange = {updateIdentity} options={options}/>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                autoFocus
                type="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
              />
            </FormGroup>
            <Button block bsSize="large" disabled={!validateForm()} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
    );
}

/*
 * Adapted from:
 * https://serverless-stack.com/chapters/create-a-login-page.html
 *
 */

