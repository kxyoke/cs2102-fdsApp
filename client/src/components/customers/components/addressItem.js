import React, {useState} from 'react';

export default function AddressItem(props) {
    const {address} = props.address;
    
    return (
        <React.Fragment>
            <tr>
                <th scope="row">{address}</th>
                
                <button class = 'btn btn-outline-danger' onClick={e=>console.log('click')} >Edit</button>
            </tr>
        </React.Fragment>

    )
}