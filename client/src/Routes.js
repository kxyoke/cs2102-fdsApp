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
import RestaurantMenu from './components/customers/pages/customer_restaurant';
import CCart from './components/customers/pages/customer_cart';
import RHome from './components/delivery_riders/pages/home';
import FHome from './components/fds/pages/home';
import ResHome from './components/restaurant_staff/page/home';
import LoginHome from './components/login/home_before_login';
import Login from './components/login/login_page';
import SignUp from './components/signup/signUp';
import RSchedule from "./components/delivery_riders/pages/rider_schedule";
import RDeliveries from "./components/delivery_riders/pages/rider_getDeliveries";
import FTEditSchedule from "./components/delivery_riders/pages/rider_editschedule";
import ROrders from "./components/delivery_riders/pages/rider_getOrders";
import RDetailedOrders from "./components/delivery_riders/pages/rider_getDetailedOrders";

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
            <Route exact path='/deliveryRider' component={WithRiderAuth(RHome)}/>
              <Route path='/deliveryRider/schedule' component={WithRiderAuth(RSchedule)}/>
              <Route path='/deliveryRider/editSchedule' component={WithRiderAuth(FTEditSchedule)}/>
              <Route path='/deliveryRider/getDeliveries' component={WithRiderAuth(RDeliveries)}/>
              <Route path='/deliveryRider/getOrders' component={WithRiderAuth(ROrders)}/>
              <Route path='/deliveryRider/getOrderDetails' component={WithRiderAuth(RDetailedOrders)}/>
              <Route path='/restaurant' component={WithResStaffAuth(ResHome)}/>
            <Route path='/fdsManager' component={WithFdsAuth(FHome)}/>

            <Route exact path='/customer' component={WithCustomerAuth(CHome)}/>
            <Route path='/customer/order' component={WithCustomerAuth(COrder)}/>
            <Route path='/customer/reviews' component= {WithCustomerAuth(CReviews)}/> 
            <Route path='/customer/profile' component={WithCustomerAuth(CProfile)}/>
            <Route path='/customer/resMenu' component={WithCustomerAuth(RestaurantMenu)}/>
            <Route path='/customer/coupon' component={WithCustomerAuth(CCoupons)}/>
            <Route path='/customer/address' component={WithCustomerAuth(CAddress)}/>
            <Route path='/customer/setting' component={WithCustomerAuth(CSetting)}/>
            <Route path='/customer/cart' component={WithCustomerAuth(CCart)}/>
            <Route render={() => <h1>404 Not found</h1>}/>
          </Switch>
        </div>
    );
}

