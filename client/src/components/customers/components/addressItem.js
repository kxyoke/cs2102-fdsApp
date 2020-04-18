import React from 'react';

export default function AddressItem(props) {
    const {address} = props.address;
    function updateAddress () {
        props.props.history.push({pathname:"/customer/editAddress",
    state:{action: "update" ,oldAddress:address}})
    }
    return (
        <React.Fragment>
            <tr>
                <th scope="row">{address}</th>
                <th>
                <button class = 'btn btn-outline-danger' onClick={updateAddress} >Edit</button>
                </th>
            </tr>
        </React.Fragment>

    )
}