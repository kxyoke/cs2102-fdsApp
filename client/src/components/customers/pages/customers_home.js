import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import SearchBar from '../layout/searchbar';
import Pagination from '../components/pagination';
import RestaurantItem from '../components/restaurantItem';
import axios from 'axios';

export default function CHome (props) {
   
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [restaurantPerPage] =useState(10);

    useEffect( ()=> {
        const fetchData = async () => {
        await axios.get('/api/customer/res')
        .then (res=> {
            setRestaurants(res.data);
            
        })
        
        };
        fetchData();
    }, []);

    //current restaurant
    const indexOfLastRes = currentPage*restaurantPerPage;
    const indexOfFirstRes = indexOfLastRes-restaurantPerPage;
    const currentRes = restaurants.slice(indexOfFirstRes, indexOfLastRes);

    //Change page
    const paginate = (pageNumber)=> setCurrentPage(pageNumber);
    
        return (
            <div className="Home">
            <Header/>
            <SearchBar/>
            <p> </p>
            <div class="container">
            <div className="Restaurants">
                <div class="card-columns">
                  {currentRes.map(restaurant => (
                      <RestaurantItem restaurant={restaurant} props={props} />
                  ))}
                  </div>
                    <div class="row justify-content-md-center">
                        <Pagination itemPerPage={restaurantPerPage} totalItem={restaurants.length} paginate={paginate}/>
                    </div>
            </div>
            </div>
            </div>
        )
    
}
