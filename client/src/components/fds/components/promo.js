import React from 'react';
import { useHistory } from 'react-router-dom'
import { Button, Table } from 'semantic-ui-react'
import Utils from './utils/utils'

export default function Promo(props) {
    const {pid, description, start_day, end_day} = props.promo;
    const startDate = new Date(start_day);
    const endDate = new Date(end_day);
    const history = useHistory();
    var promoProps = Utils.fdsPromoParser(description);
    var promoDesc = Utils.getPromoDesc(promoProps.promoType, promoProps.discountType, promoProps.discountValue);

    function edit() {
        history.push({
            pathname: '/fdsManager/promos/edit',
            state: {
                isEdit: true,
                promo: props.promo
            }
        })
    }

    
    return (
            <Table.Row>
                <Table.Cell>{pid}</Table.Cell>
                <Table.Cell>{promoDesc}</Table.Cell>
                <Table.Cell>{startDate.toLocaleDateString()}</Table.Cell>
                <Table.Cell>{endDate.toLocaleDateString()}</Table.Cell>
                <Table.Cell><Button onClick={edit}>Edit</Button></Table.Cell>
            </Table.Row>
    )
}