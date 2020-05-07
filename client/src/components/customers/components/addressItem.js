import React from 'react';

export default function AddressItem(props) {
    const {address, postal_code} = props.address;
    function updateAddress () {
        props.props.history.push({pathname:"/customer/editAddress",
    state:{action: "update" ,oldAddress:address, oldPostal:postal_code}})
    }
    return (
        <React.Fragment>
            <tr>
                <th scope="row">{address} S{postal_code}</th>
                <th>
                <button class = 'btn btn-outline-danger' onClick={updateAddress} >Edit</button>
                </th>
            </tr>
        </React.Fragment>

    )
}