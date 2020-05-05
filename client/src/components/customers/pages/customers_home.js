import React, { useState, useEffect } from 'react';
import Header from '../layout/header';
import SearchBar from '../layout/searchbar';
import Pagination from '../components/pagination';
import RestaurantItem from '../components/restaurantItem';
import axios from 'axios';
import FuzzySearch from 'fuzzy-search';
import {Loader, Message} from 'semantic-ui-react';

export default function CHome (props) {
    const [loading, setLoading] = useState(true);
    const [restaurants, setRestaurants] = useState([]);
    const [currentPage, setCurrentPage]=useState(1);
    const [restaurantPerPage] =useState(10);
    const [fullRestaurantList, setFullRestaurantList]= useState([]);
    const [message,setMessage] = useState('');
    const searcher =new FuzzySearch(fullRestaurantList, ['rname'], {
        caseSensitive:false,
    });

    useEffect( ()=> {
        const fetchData = async () => {
        await axios.all([
            axios.get('/api/customer/res'),
            axios.get('/api/customer/status'),
            axios.get('/api/customer/promo/fds')
            ])
            .then (axios.spread((...res)=> {
                const list = res[0];
                const status= res[1];
                const promo = res[2];
                if(status.data !== 'OK') {
                    
                    setMessage(status.data);
                }
                
                setFullRestaurantList(list.data);
                setRestaurants(list.data);
                setLoading(false);

                console.log(promo.data);
            })
            )
        
        
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
                {loading?
                    <Loader active inline='centered'>Loading</Loader> 
                    :
                    <div class="container">
                    {message.length>0
                ? <Message
                    info
                    onDismiss={()=> setMessage('')}   
                    >
                    {message} &nbsp;<a href='/customer/current'>Click to view</a>&nbsp;.
                    </Message>
                : null}
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
                        :
                        <p> Currently, there is not restaurant available....</p>}
                     </div>
                }
                    
            </div>
        )
    
}
