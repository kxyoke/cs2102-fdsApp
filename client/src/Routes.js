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
import FProfile from './components/fds/pages/profile';
import FPromos from './components/fds/pages/manager_promos';
import FCoupons from './components/fds/pages/manager_coupons';

import ResHome from './components/restaurant_staff/page/home';
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
            <Route path='/restaurant' component={WithResStaffAuth(ResHome)}/>
            <Route path='/fdsManager' component={WithFdsAuth(FHome)}/>
            <Route path='/customer/order' component={WithCustomerAuth(COrder)}/>
            <Route path='/customer/reviews' component= {WithCustomerAuth(CReviews)}/> 
            <Route path='/customer/profile' component={WithCustomerAuth(CProfile)}/>
            
            <Route path='/fdsManager/profile' component={WithFdsAuth(FProfile)}/>
            <Route path='/fdsManager/promos' component={WithFdsAuth(FPromos)}/>
            <Route path='/fdsManager/coupons' component={WithFdsAuth(FCoupons)}/>

            <Route render={() => <h1>404 Not found</h1>}/>
          </Switch>
        </div>
    );
}

