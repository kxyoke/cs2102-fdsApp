import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect,
        useRouteMatch, useParams 
} from 'react-router-dom';

import CHome from './components/customers/pages/customers_home';
import COrder from './components/customers/pages/customer_order';
import CReviews from './components/customers/pages/customer_reviews';
import CProfile from './components/customers/pages/customer_profile';
import CCoupons from './components/customers/pages/customer_coupons';
import CAddress from './components/customers/pages/customer_address';
import CSetting from './components/customers/pages/customer_setting';

import LoginHome from './components/login/home_before_login';
import Login from './components/login/login_page';

export default function Routes() {

    /* NOTE: LoginHome will need to have auth to autologin if already logged in, i.e. autoredirect to __Home. */

    /* TODO: insert ALL routes here. */
    return (
        <div>
          <Switch>
            <Route path='/'>
              <LoginHome />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/customer'>
              <CHome />
            </Route>
            <Route path='/customer/order'>
              <COrder />
            </Route>
            <Route path='/customer/reviews'>
              <CReviews />
            </Route>
            <Route path='/customer/profile'>
              <CProfile />
            </Route>
          </Switch>
        </div>
    );
}

