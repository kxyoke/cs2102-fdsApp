import React from 'react';
import{ BrowserRouter as Router, Route } from 'react-router-dom';

import CHome from './components/customers/pages/customers_home'
import COrder from './components/customers/pages/customer_order'
import CReviews from './components/customers/pages/customer_reviews'
import CProfile from './components/customers/pages/customer_profile'
import CCoupons from './components/customers/pages/customer_coupons'
import CAddress from './components/customers/pages/customer_address'
import CSetting from './components/customers/pages/customer_setting'

import './App.css';

function App() {
  return (
    <Router>
    <div className='container'>
    <Route exact path="/" render= {props=>
    <React.Fragment>
       <h1>Home</h1>
    </React.Fragment>
    }
    />
    
    <Route path = '/customer/home' component={CHome}/>
    <Route path ='/customer/order' component={COrder}/>
    <Route path ='/customer/reviews' component={CReviews}/>
    <Route path ='/customer/profile' component={CProfile}/>
    <Route path ='/customer/coupon' component={CCoupons}/>
    <Route path ='/customer/address' component={CAddress}/>
    <Route path ='/customer/setting' component={CSetting}/>
    </div>
    </Router>
  );
}

export default App;
