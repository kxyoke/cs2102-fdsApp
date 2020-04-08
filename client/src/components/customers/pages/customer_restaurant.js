import React, {useEffect, useState} from "react";
import axios from "axios";
import MenuItem from "../components/menuItem";
import Header from "../layout/header";

export default function RestaurantMenu(props) {
    const {res_id, rname} = props.location.state;
    const url = '/api/customer/menu/' + res_id;
    const [menuItem, setMenuItem] = useState([]);
    useEffect( ()=> {
        const fetchData = async () => {
        console.log(props);
        await axios.get(url)
            .then(res=> {
                console.log(res.data);
                setMenuItem(res.data);

            });
        };
        fetchData()
    }, [])

    return (
        <div>
        <Header></Header>
        <ul class="list-unstyled">
  
        {menuItem.map(e=><li class="d-inline border  table-cell">
        <MenuItem foodItem={e}/>
        </li>)}
        </ul>
        </div>
    )
}