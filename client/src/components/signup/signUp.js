import React, { useState, useEffect } from "react";
import { Button, Form, Segment, Select, Header } from 'semantic-ui-react';

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
    const [resPassword, setResPassword] = useState('')
    const [resPassword2, setResPassword2] = useState('')

    const riders = [
      {key: 'p', value:'part', text:"Part-time rider"},
      {key: 'f', value:'full', text:"Full-time rider"}
    ];
    const options = [
        {key: 'c', value:"customer", text: 'Customer'},
        {key: 'r', value:"restaurantStaff", text:'Restaurant Staff'},
        {key: 'dr', value:"deliveryRider", text:'Delivery Rider'}
    ];

    function updateIdentity(e, target)  {
        setMessage('');
        setIdentity(target.value);
        if(target.value === 'restaurantStaff') {
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
        let userValid = username.length > 0 && password.length > 0 
          && password2 ===password && resName.length > 0
        let resValid = min_amt !=='' && resAddress.length>0
          && resPassword2 === resPassword && resPassword.length > 0
        return userValid && (isUnderExistingRes || resValid)
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
                    isNewRes: !isUnderExistingRes, //equiv to isResManager.
                    resPassword: resPassword
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
          } else if (err.response.status === 421) {
              setMessage('Restaurant password incorrect!')
              setResPassword('')
              setResPassword2('')
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
              <div>
                <Form.Field placeholder='Select your restaurant --'
                  control={Select} label='Select your restaurant'
                  onChange = {(e, target) => setResDetails(target.value)} 
                  options={restaurants.map( r => ({key: r.rname, value: r, text: r.rname}) )} 
                  required/>
                <Form.Input label='Restaurant password'
                  onChange={e => setResPassword(e.target.value)}
                  />
              </div>
            ) : (
                <div>
                  <Form.Group widths='equal'>
                    <Form.Field fluid
                      label='Restaurant name'
                      autoFocus
                      control='input'
                      value={resName}
                      placeholder="Restaurant Name"
                      onChange={e => {setMessage('');
                      setResName(e.target.value)}}
                    />
                    <Form.Field fluid
                      label='Minimum spending ($)'
                      autoFocus
                      control='input'
                      value={min_amt}
                      onChange={e => {setMessage('');
                      setMinAmt(e.target.value)}}
                    />
                  </Form.Group>
                
                <Form.Group>
                  <Form.Field fluid
                    label='Address'
                    value={resAddress}
                    onChange={e => {setMessage('');
                    setResAddress(e.target.value)}}
                    control='input'
                />
                </Form.Group>
                
                <Form.Group widths='equal'>
                  <Form.Field fluid
                    label='Restaurant Password for Staffs'
                    value={resPassword}
                    onChange={e => {setMessage('');
                    setResPassword(e.target.value)}}
                    control='input'
                    type='password'
                  />
                  <Form.Field fluid
                    label='Re-enter your restaurant password.'
                    value={resPassword2}
                    onChange={e=> {setMessage('');
                    setResPassword2(e.target.value)}}
                    control='input'
                    type='password'
                  />
                  {resPassword === resPassword2 && resPassword.length >0 && resPassword2.length>0
                  ?<small>Passwords match.</small>
                  : resPassword2.length > 0
                    ?<small >Passwords do not match.</small>
                    : null
                  }
                </Form.Group>
              </div>
            )}
            </div>
        )
    }

    return (
        
      <div className ="container" >
        <div>        
          { message.length > 0 ?
            <div class="alert alert-danger" role="alert" >
            <p class="text-center">
            <strong>{message}  </strong>
            </p>
            </div>
              : null
          }

        </div>

        <Segment.Group className='container' style={{ paddingTop: '2em', paddingBottom: '1em', display: 'flex', justifyContent: 'center'}}>
        <Header as='h2' divider>Sign up</Header>
        <Segment placeholder>
        <Form className='container'>
          
          <Form.Field control={Select} placeholder = {<div>Select your identity</div> } 
            onChange = {updateIdentity} options={options} required/>
          {identity === 'deliveryRider'?
            <Form.Field control={Select} placeholder ={<div>Select rider type</div>}
              onChange = {(e)=>{
              setMessage('');
              setRiderType(e.value)}}
             options={riders} required/>
          : null}

            <Form.Group widths='equal'>
              <Form.Input fluid
                label='Username'
                autoFocus
                value={username}
                onChange={e => {
                  setMessage('');
                  setUsername(e.target.value)}}
              />
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Input fluid
                label='Password'
                type='password'
                value={password}
                onChange={e => {setMessage('');
                setPassword(e.target.value)}}
              />
              <Form.Input fluid
                label='Enter your password again.'
                value={password2}
                type='password'
                onChange={e=> {setMessage('');
                setPassword2(e.target.value)}}
              />
              {password === password2 &&password.length >0 &&password2.length>0
              ?<small>password are the same</small>
              : password2.length > 0
                ?<small >passwords are not the same</small>
                : null
              }
            </Form.Group>
           
            </Form>
            </Segment>

            {identity === 'restaurantStaff'
            ? <Segment.Group>
               <Segment inverted className='container'> 
               <Form inverted>
                <Form.Group grouped>
                  <Form.Field control='input' type='radio'
                    label='Create a new restaurant as manager.'
                    checked={!isUnderExistingRes}
                    value={false}
                    onChange={e => setIsExistingRes(!e.target.checked)}
                    />
                  <Form.Field control='input' type='radio'
                    label='Select an existing restaurant as staff.'
                    onChange={e => setIsExistingRes(e.target.checked)}
                    value={true}
                    checked={isUnderExistingRes}
                    />
                </Form.Group>
                <Form.Group>
                {resDetailsForm()}
                </Form.Group>
               </Form>
               </Segment>
              </Segment.Group>
              :null}

             <Segment className='container'>
              <Button disabled={!validateForm()} onClick={handleSubmit}>
                Sign Up
              </Button>
            </Segment>
        </Segment.Group>
      </div>
    );
}

