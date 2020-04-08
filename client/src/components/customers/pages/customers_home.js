import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import SearchBar from '../layout/searchbar';
import RestaurantItem from '../components/restaurantItem';
import axios from 'axios';

export default function CHome (props) {
   
    const [restaurants, setRestaurants] = useState([]);
    const [redirect, setRedirect] = useState(false);
    function enterRestaurant(e)  {
        console.log("Enter restaurant")
        setRedirect(true);

    }
    useEffect( ()=> {
        const fetchData = async () => {
        await axios.get('/api/customer/res')
        .then (res=> {
            setRestaurants(res.data);
            
        })
        
        };
        fetchData();
    }, []);
        return (
            <div className="Home">
            <Header/>
            <SearchBar/>
            <p> </p>
            <div className="Restaurants">
                <div class="card-columns">
                  {restaurants.map(e => (
                      <RestaurantItem restaurant={e}/>
                  ))}
                  </div>
            </div>
            </div>
        )
    
}
