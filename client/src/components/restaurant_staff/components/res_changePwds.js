import React, {useState} from 'react';
import { Button, Form, Segment, Header, Message } from 'semantic-ui-react';

import axios from 'axios';

export default function ResStaffChangePassword(props) {
    const { is_manager, staff_id, rid } = props.userResInfo;

    const [username, setUsername] = useState('')
    
    const [oldUserPwd, setOldUserPwd] = useState('')
    const [userPwd, setUserPwd] = useState('')
    const [userPwd2, setUserPwd2] = useState('')

    const [oldResPwd, setOldResPwd] = useState('')
    const [resPwd, setResPwd] = useState('')
    const [resPwd2, setResPwd2] = useState('')

    //error states
    const [isUsernameTaken, setUsernameIsTaken] = useState(false)
    const [isUserPwdMatchError, setUserPwdMatchError] = useState(false)
    const [isResPwdMatchError, setResPwdMatchError] = useState(false)

    function resetUserPwds() {
        setOldUserPwd('')
        setUserPwd('')
        setUserPwd2('')
    }
    function resetResPwds() {
        setOldResPwd('')
        setResPwd('')
        setResPwd2('')
    }

    function handleSubmitName(e) {
        console.log('was here')
        axios.put('/api/restaurant/username/' + staff_id, {
            newName: username
        })
            .then(res => {
                if (res.status == 200) {
                    setUsernameIsTaken(false)
                    alert('Username successfully changed to '+username+'!')
                    setUsername('')
                }
            })
            .catch(err => {
                console.log(err)
                setUsernameIsTaken(true)
            });
    }

    function handleSubmitUser(e) {
        axios.put('/api/restaurant/userPwd/' + staff_id, {
            oldPwd: oldUserPwd,
            newPwd: userPwd
        })
            .then(res => {
                if (res.status == 200) {
                    setUserPwdMatchError(false)
                    alert('User password successfully changed!')
                    resetUserPwds()
                }
            })
            .catch(err => {
                console.log(err)
                setUserPwdMatchError(true)
            });
    }

    function handleSubmitRes(e) {
        axios.put('/api/restaurant/resPwd/' + rid, {
            oldPwd: oldResPwd,
            newPwd: resPwd
        })
            .then(res => {
                if (res.status == 200) {
                    setResPwdMatchError(false)
                    alert('Restaurant password successfully changed!')
                    resetResPwds()
                }
            })
            .catch(err => {
                console.log(err)
                setResPwdMatchError(true)
            });
    }

    function validateUsername() {
        return username.length > 0
    }
    function validateUserPwd() {
        return userPwd == userPwd2 && userPwd.length > 0 && oldUserPwd.length > 0
    }
    function validateResPwd() {
        return resPwd == resPwd2 && resPwd.length > 0 && oldResPwd.length > 0
    }

    return (
      <div className='container'>
      <Segment.Group>
        <Segment inverted color='olive'>
        <Header as='h2' dividing>Change your username</Header>
        <Form error>
          {isUsernameTaken 
              ? (<Message error header='Username taken' content='Please try a different one.' />)
              : null}
          <Form.Input fluid label='Enter your new username'
            onChange={e => setUsername(e.target.value)}
            placeholder='Unique username'
          />
          <Button color='teal' onClick={handleSubmitName}
            disabled={!validateUsername()}>Submit</Button>
        </Form>
        </Segment>

        <Segment>
        <Header as='h2' dividing>Change your account password</Header>
        <Form error success>
         <Form.Group>
          <Form.Input fluid label='Old User Password' type='password'
            onChange={e => setOldUserPwd(e.target.value)} 
            value={oldUserPwd} width={8}/>
         </Form.Group>
         <Form.Group>
          <Form.Input fluid label='Change User Password' type='password'
            onChange={e => setUserPwd(e.target.value)} 
            value={userPwd} width={8}/>
          <Form.Input fluid label='Confirm User Password' type='password'
            onChange={e => setUserPwd2(e.target.value)}
            error={userPwd.length > 0 && !validateUserPwd()} 
            value={userPwd2} width={8}/>
         </Form.Group>
          {isUserPwdMatchError 
              ? (<Message error header='Password incorrect' content='Please make sure your password is correct.' />)
              : null}
          <Button disabled={!validateUserPwd()} onClick={handleSubmitUser}>Submit</Button>
        </Form>
        </Segment>

        { is_manager ? (
          <Segment.Group><Segment inverted>
            <Header as='h2' dividing>Change Restaurant Password for Staffs</Header>
            <Form inverted error success>
             <Form.Group>
              <Form.Input fluid label='Old Restaurant Password' type='password'
                onChange={e => setOldResPwd(e.target.value)} 
                value={oldResPwd} width={8}/>
             </Form.Group>
             <Form.Group>
              <Form.Input fluid label='Change Restaurant Password' type='password'
                onChange={e => setResPwd(e.target.value)} 
            
                value={resPwd} width={8}/>
              <Form.Input fluid label='Confirm Restaurant Password' type='password'
                onChange={e => setResPwd2(e.target.value)}
                error={resPwd.length > 0 && !validateResPwd()}
                value={resPwd2} width={8}/>
             </Form.Group>
              {isResPwdMatchError 
                  ? (<Message error header='Password incorrect' content='Please make sure your restaurant password is correct.' />)
                  : null}
              <Button disabled={!validateResPwd()} onClick={handleSubmitRes}>Submit</Button>
            </Form>
          </Segment></Segment.Group>
        ) : null}
      </Segment.Group>
      </div>
    )
}

