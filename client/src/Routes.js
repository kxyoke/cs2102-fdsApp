import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect,
        useRouteMatch, useParams 
} from 'react-router-dom';
import WithCustomerAuth from './tool/withCustomerAuth';
import WithRiderAuth from './tool/withRiderAuth';
import WithResStaffAuth from './tool/withResStaff'
import WithFdsAuth from './tool/withFdsAuth';
import WithNoAuth from './tool/withNoAuth';


import CHome from './components/customers/pages/customers_home';
import COrder from './components/customers/pages/customer_order';
import CReviews from './components/customers/pages/customer_reviews';
import CProfile from './components/customers/pages/customer_profile';
import CCoupons from './components/customers/pages/customer_coupons';
import CAddress from './components/customers/pages/customer_address';
import CSetting from './components/customers/pages/customer_setting';

import RHome from './components/delivery_riders/pages/home';
import FHome from './components/fds/pages/home';

import ResHome from './components/restaurant_staff/pages/home';
import ResProfile from './components/restaurant_staff/pages/profile';
import ResReview from './components/restaurant_staff/pages/review';
import ResMenu from './components/restaurant_staff/pages/menu';
import ResMenuEdit from './components/restaurant_staff/pages/menuForm';
import ResPromo from './components/restaurant_staff/pages/promo';
import ResOrder from './components/restaurant_staff/pages/order';

import LoginHome from './components/login/home_before_login';
import Login from './components/login/login_page';
import SignUp from './components/signup/signUp';
export default function Routes() {

    /* NOTE: LoginHome will need to have auth to autologin if already logged in, i.e. autoredirect to __Home. */

    /* TODO: insert ALL routes here. */
    return (
        <div>
          <Switch>
            <Route exact path='/' component={WithNoAuth(LoginHome)}/>
              
            <Route path='/login' component={(Login)}/>
            <Route path = '/signUp' component= {WithNoAuth(SignUp)}/>
            <Route exact path='/customer' component={WithCustomerAuth(CHome)}/>
            <Route path='/deliveryRider' component={WithRiderAuth(RHome)}/>
            <Route exact path='/restaurant' component={WithResStaffAuth(ResHome)}/>
            <Route path='/fdsManager' component={WithFdsAuth(FHome)}/>

            <Route path='/customer/order' component={WithCustomerAuth(COrder)}/>
            <Route path='/customer/reviews' component= {WithCustomerAuth(CReviews)}/> 
            <Route path='/customer/profile' component={WithCustomerAuth(CProfile)}/>
            
            <Route path='/restaurant/profile' component={WithResStaffAuth(ResProfile)}/>
            <Route path='/restaurant/reviews' component={WithResStaffAuth(ResReview)}/>
            <Route path='/restaurant/promos' component={WithResStaffAuth(ResPromo)}/>
            <Route exact path='/restaurant/menu' component={WithResStaffAuth(ResMenu)}/>
            <Route path='/restaurant/menu/edit' component={WithResStaffAuth(ResMenuEdit)}/>
            <Route path='/restaurant/orders' component={WithResStaffAuth(ResOrder)}/>

            <Route render={() => <h1>404 Not found</h1>}/>
          </Switch>
        </div>
    );
}

