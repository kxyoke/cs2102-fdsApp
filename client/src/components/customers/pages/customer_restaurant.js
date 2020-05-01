import React, {useEffect, useState} from "react";
import axios from "axios";
import MenuItem from "../components/menuItem";
import Header from "../layout/header";

export default function RestaurantMenu(props) {
    const {res_id, rname} = props.location.state;
    const [show, setShow] = useState(false);
    const url = '/api/customer/menu/' + res_id;
    const [menuItem, setMenuItem] = useState([]);
    useEffect( ()=> {
        const fetchData = async () => {
        await axios.get(url)
            .then(res=> {
                if(res.data.length > 0) {
                setShow(true);
                setMenuItem(res.data);
                }

            });
        };
        fetchData()
        
    }, [url])

    return (
        <div>
        <Header></Header>
        <div class="container">
        <h1 class="center">
            {rname}
        </h1>
        {show?
       
        <ul class="list-unstyled">
  
        {menuItem.map((e, i)=>
        <MenuItem key ={i} foodItem={e} res_id={res_id}/>
        )}
        </ul>
        
        :<div class ="mx-auto" style={{width:"350px"}}>
            <p> </p>
           <p> There is no food available in the restaurant....</p>

        </div>}
        </div>
        </div>
    )
}