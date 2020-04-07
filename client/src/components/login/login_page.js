import React,{useState} from "react";
import {Redirect} from "react-router";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./layout/login.css";
import axios from 'axios';

export default function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
  if(!props.location.about) {
    alert("Please select your identity first!")
    return <Redirect to= '/'/>
  }
   
  const {identity} = props.location.about;
  const path = '/'+identity;
  const url = '/api/login/' + identity;

    function validateForm() {
        return username.length > 0 && password.length > 0;
    }

     function handleSubmit(event) {
        event.preventDefault();
        axios.post(url, {username: username, password:password}).then(res=>{
          if (res.status === 200) {
            setPassword('');
            props.history.push(path);
          }else {
            console.log(res)
            props.history.push('/')
          }
        })
        .catch(err => {
          if(err.response){
            console.log(err.response.status);
            
            if (err.response.status === 401) {
              console.log(err.response.data);
              alert(err.response.data)
              
            } else {
              console.log(err)
              
            }
            props.history.push('/')
          }else if (err.request) {
            console.log(err.request);
          }else {
          console.log('Error', err.message);
          }
          
          
        })

    }

    return (
        <div className="Login">
          <form onSubmit={handleSubmit}>
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
              Login
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

