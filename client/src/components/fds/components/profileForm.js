import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom'
import { Form, Button, Grid, Segment, Table } from 'semantic-ui-react'
import axios from 'axios';

export default function ProfileForm(props) {
    const { isUsername, oldUsername } = props;

    const [newUsername, setNewUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordConfirmation, setPasswordConfirmation] = useState(null);
    const history = useHistory();

    useEffect(() => {
        setNewUsername(oldUsername)
    }, [props])

    function submit() {
        const reqBody = {
            isUsername: isUsername,
            username: newUsername,
            password: password,
            passwordConfirmation: passwordConfirmation
        }

        axios.put('/api/fdsManager/profile', reqBody)
            .then(res => {
                if (res.status == 200) {
                    history.push('/fdsManager/profile/');
                }
            })
            .catch(err => {
                alert(err.response.data);
                console.log(err);
            });
        
    }

    return (
        <Grid className="center aligned">
            {isUsername?
                <Segment basic>
                    <Grid.Row>
                        <Table>
                            <Table.Header>
                                <Table.HeaderCell>Username</Table.HeaderCell>
                            </Table.Header>

                            <Table.Body>
                                <Table.Row>
                                    <Table.Cell>{oldUsername}</Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        </Table>
                    </Grid.Row>
                </Segment>
            : null
            }

            <Grid.Row>
                <Form>
                    {isUsername?
                        <Form.Input required
                                label='New Username' 
                                onChange={e => setNewUsername(e.target.value)}
                        />
                    :
                        <Form.Group widths='equal'>
                            <Form.Input required
                                label='New Password' 
                                onChange={e => setPassword(e.target.value)}
                            />
                            <Form.Input required
                                label='Confirm New Password' 
                                onChange={e => setPasswordConfirmation(e.target.value)}
                            />
                        </Form.Group>
                    }
                </Form>
            </Grid.Row>
            <Grid.Row>
                <Button primary onClick={submit}>Confirm</Button>
            </Grid.Row>
        </Grid>
    )
}