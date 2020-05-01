import React,{useState, useEffect} from 'react'
import HeaderMenu from '../layout/headerMenu'
import { useHistory } from 'react-router-dom'
import { Button, Header, Table, Segment } from 'semantic-ui-react'
import axios from 'axios';

export default function FProfile(props) {
    const [username, setUsername] = useState([]);
    const [show, setShow] = useState(false);
    const history = useHistory();

    function editUsername() {
        history.push({
            pathname: '/fdsManager/profile/edit',
            state: {
                isUsername: true,
                oldUsername: username
            }
        })
    }

    function editPassword() {
        history.push({
            pathname: '/fdsManager/profile/edit',
            state: {
                isUsername: false,
                oldUsername: username
            }
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/fdsManager/profile')
                .then(res=> {
                    console.log(res.data);
                    setUsername(res.data.username);
                    setShow(true);
                })
        }
        fetchData();
    }, [])

    return(
        <div className="Profile">
            <HeaderMenu/>
            <Header 
                as='h1' 
                textAlign='center'
                content='User Profile'
                subheader='Manage your login details'
            />

            <div class="container">
            <Segment basic textAlign='center'>
                <Table textAlign='center'>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Username</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{username}</Table.Cell>    
                        </Table.Row>                
                    </Table.Body>
                </Table>

                <Button onClick={editUsername} icon='edit' content='Change Username'/>
                <Button onClick={editPassword} icon='edit' content='Change Password'/>
            </Segment>
            </div>
        </div>
    )
}