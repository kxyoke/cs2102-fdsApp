import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect,
        useRouteMatch, useParams 
} from 'react-router-dom';
import WithAuth from './tool/withAuth';
import WithNoAuth from './tool/withNoAuth';
import CHome from './components/customers/pages/customers_home';
import COrder from './components/customers/pages/customer_order';
import CReviews from './components/customers/pages/customer_reviews';
import CProfile from './components/customers/pages/customer_profile';
import CCoupons from './components/customers/pages/customer_coupons';
import CAddress from './components/customers/pages/customer_address';
import CSetting from './components/customers/pages/customer_setting';

import RHome from './components/deliver_ridders/pages/home';
import FHome from './components/fds/pages/home';
import ResHome from './components/restaurant_staff/page/home';
import LoginHome from './components/login/home_before_login';
import Login from './components/login/login_page';

export default function Routes() {

    /* NOTE: LoginHome will need to have auth to autologin if already logged in, i.e. autoredirect to __Home. */

    /* TODO: insert ALL routes here. */
    return (
        <div>
          <Switch>
            <Route exact path='/' component={WithNoAuth(LoginHome)}/>
              
            <Route path='/login' component={(Login)}/>
            <Route exact path='/customer' component={WithAuth(CHome)}/>
            <Route path='/deliveryRider' component={WithAuth(RHome)}/>
            <Route path='/restaurant' component={WithAuth(ResHome)}/>
            <Route path='/fdsManager' component={WithAuth(FHome)}/>
            <Route path='/customer/order' component={WithAuth(COrder)}/>
            <Route path='/customer/reviews' component= {WithAuth(CReviews)}/> 
            <Route path='/customer/profile' component={WithAuth(CProfile)}/>
            <Route render={() => <h1>404 Not found</h1>}/>
          </Switch>
        </div>
    );
}
