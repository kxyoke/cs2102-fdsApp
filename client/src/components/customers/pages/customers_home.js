import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import SearchBar from '../layout/searchbar';
import Pagination from '../components/pagination';
import RestaurantItem from '../components/restaurantItem';
import axios from 'axios';
import FuzzySearch from 'fuzzy-search';

export default function CHome (props) {
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [restaurantPerPage] =useState(10);
    const [fullRestaurantList, setFullRestaurantList]= useState([]);
    const searcher =new FuzzySearch(fullRestaurantList, ['rname'], {
        caseSensitive:false,
    });

    useEffect( ()=> {
        const fetchData = async () => {
        await axios.get('/api/customer/res')
        .then (res=> {
            setFullRestaurantList(res.data);
            setRestaurants(res.data);
            setLoading(false);
            
        })
        
        };
        fetchData();
       
    }, []);

    const search= (input) => {
        setRestaurants(searcher.search(input));
    }

    //current restaurant
    const indexOfLastRes = currentPage*restaurantPerPage;
    const indexOfFirstRes = indexOfLastRes-restaurantPerPage;
    const currentRes = restaurants.slice(indexOfFirstRes, indexOfLastRes);

    //Change page
    const paginate = (pageNumber)=> setCurrentPage(pageNumber);
    
        return (
            <div className="Home">
            <Header/>
            <SearchBar search ={search}/>
            <p> </p>
            <div class="container">
            {fullRestaurantList.length?
            <div>
            {restaurants.length?
            <div className="Restaurants">
                <div class="card-columns">
                  {currentRes.map((restaurant, i) => (
                      <RestaurantItem key={i} restaurant={restaurant} props={props} />
                  ))}
                  </div>
                    <div class="row justify-content-md-center">
                        <Pagination itemPerPage={restaurantPerPage} totalItem={restaurants.length} paginate={paginate}/>
                    </div>
            </div>
            : <p> There are no restaurant matching your search.....</p>
            }
            </div>
            : <div>
            {loading? null: <p> Currently, there is not restaurant available....</p>}
            </div>
            }
            </div>
            </div>
        )
    
}
