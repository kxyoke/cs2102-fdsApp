import React from 'react';

export default function AddressItem(props) {
    const {address} = props.address;
    function updateAddress () {
        props.props.history.push({pathname:"/customer/editAddress",
    state:{oldAddress:address}})
    }
    return (
        <React.Fragment>
            <tr>
                <th scope="row">{address}</th>
                
                <a class = 'btn btn-outline-danger' onClick={updateAddress} >Edit</a>
            </tr>
        </React.Fragment>

    )
}