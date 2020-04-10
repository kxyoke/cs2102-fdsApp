import React, { useState, useEffect } from 'react'
import Header from '../layout/header'
import Axios from 'axios'
import AddressItem from '../components/addressItem'

export default function CAddress (props) {
    const [address, setAddress] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await Axios.get('/api/customer/address')
                    .then(res=> {
                        setAddress(res.data);
                        setShow(true);
                    })
        }
        fetchData();
    }, [])

  
        return(
            <div>
            <Header/>
             <div className="MyAddress">
             {show?
             <div class="row">
             <div class="col-2"></div>
             <div class='col'>
             <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {address.map(cp=> 
                        
                        <AddressItem address={cp}/>
                        
                    )}
                    
                </tbody>
                </table>
                </div>
                <div class="col-2"></div>
                </div>
                :<div class ="mx-auto" style={{width:"350px"}}>
                    <p> </p>
                    <p> You have not added address....</p>
                </div>
             }
            </div>
            </div>
        )
    
}