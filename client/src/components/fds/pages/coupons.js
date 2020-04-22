import React, { useState, useEffect } from 'react'
import HeaderMenu from '../layout/headerMenu'
import Coupon from '../components/coupon'
import { useHistory } from 'react-router-dom'
import { Button, Header, Table, Segment } from 'semantic-ui-react'
import axios from 'axios';

export default function FCoupons(props) {
    const [coupons, setCoupons] = useState([]);
    const [show, setShow] = useState(false);
    const history = useHistory();

    useEffect(() => {
        const fetchData = async () => {
            await axios.get('/api/fdsManager/coupons')
                    .then(res=> {
                        console.log(res.data);
                        setCoupons(res.data);
                        setShow(true);
                    })
        }
        fetchData();
    }, [])

    function add() {
        history.push({
            pathname: '/fdsManager/coupons/edit',
            state: {
                isEdit: false,
                coupon: null
            }
        })
    }


    return(
        <div className="FdsCoupons">
            <HeaderMenu/>
            <Header 
                as='h1' 
                textAlign='center'
                content='FDS Coupons'
                subheader='Manage and distribute coupons to customers'
            />
            <div class="container">
            <Button primary attached='top' onClick={add} icon='add' content='Offer Coupon'/>
            <Segment>
            {show?
            <Table>
                <Table.Header>
                    <Table.Row>
                    <Table.HeaderCell>Coupon ID</Table.HeaderCell>
                    <Table.HeaderCell>User ID</Table.HeaderCell>
                    <Table.HeaderCell>Desciption</Table.HeaderCell>
                    <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {coupons.map(cp=> 
                        
                        <Coupon coupon={cp} />
                        
                    )}
                    
                </Table.Body>
            </Table>
                : "You have no coupons."
            }
            </Segment>
            </div>
        </div>
    )
}