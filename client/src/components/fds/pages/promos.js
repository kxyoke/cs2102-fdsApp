import React, { useState, useEffect } from 'react'
import HeaderMenu from '../layout/headerMenu'
import Promo from '../components/promo'
import { useHistory } from 'react-router-dom'
import { Button, Header, Table, Segment } from 'semantic-ui-react'
import axios from 'axios';

export default function FPromos(props) {
    const [promos, setPromos] = useState([]);
    const [show, setShow] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/fdsManager/promos')
                .then(res=> {
                    console.log(res.data);
                    setPromos(res.data);
                    setShow(true);
                })
        }
        fetchData();
    }, [])

    function add() {
        history.push({
            pathname: '/fdsManager/promos/edit',
            state: {
                isEdit: false,
                promo: {}
            }
        })
    }

    return(
        <div className="FdsPromos">
            <HeaderMenu/>
            <Header 
                as='h1' 
                textAlign='center'
                content='FDS Promotions'
                subheader='Manage and launch application-wide promotions'
            />
            <div class="container">
            <Button primary attached='top' onClick={add} icon='add' content='Launch Promotion'/>
            <Segment>
            {show?
            <Table textAlign='center'>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Promotion ID</Table.HeaderCell>
                        <Table.HeaderCell>Description</Table.HeaderCell>
                        <Table.HeaderCell>Start Date</Table.HeaderCell>
                        <Table.HeaderCell>End Date</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {promos.map(p=> 
                        
                        <Promo promo={p} />
                        
                    )}
                    
                </Table.Body>
            </Table>
                : "You have no promotions."
            }
            </Segment>
            </div>
        </div>
    )
}