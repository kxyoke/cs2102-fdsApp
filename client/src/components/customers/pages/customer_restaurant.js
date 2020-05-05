import React, {useEffect, useState} from "react";
import axios from "axios";
import MenuItem from "../components/menuItem";
import Header from "../layout/header";
import utils from "../../restaurant_staff/components/utils/utils";
export default function RestaurantMenu(props) {
    const {res_id, rname} = props.location.state;
    const [show, setShow] = useState(false);
    const menuUrl = '/api/customer/menu/' + res_id;
    const promotionUrl = '/api/customer/promo/res/'+res_id;
    const [menuItem, setMenuItem] = useState([]);
    const [promotions, setPromotions] = useState([]);

    function processPromotion() {
        //parsing on price/delivery;
    }
    useEffect( ()=> {
        const fetchData = async () => {
        await axios.all([
            axios.get(menuUrl),
            axios.get(promotionUrl)
        ]).then(axios.spread((...res)=> {
            const menu = res[0];
            const promo = res[1];
                if(menu.data.length > 0) {
                    setShow(true);
                    setMenuItem(menu.data);
                }
                if (promo.data.length > 0) {
                    setPromotions(promo.data)
                    processPromotion();
                    console.log(promo.data)
                }
            })).catch(err=>{
                console.log(err)
            })
        };
        fetchData()
        
    }, [menuUrl, promotionUrl])

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