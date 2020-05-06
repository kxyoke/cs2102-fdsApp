import React from 'react';
import { Route, Switch} from 'react-router-dom';
import WithCustomerAuth from './tool/withCustomerAuth';
import WithRiderAuth from './tool/withRiderAuth';
import WithResStaffAuth from './tool/withResStaff'
import WithFdsAuth from './tool/withFdsAuth';
import WithNoAuth from './tool/withNoAuth';


import CHome from './components/customers/pages/customers_home';
import COrder from './components/customers/pages/customer_order';
import CReviews from './components/customers/pages/customer_reviews';
import CCoupons from './components/customers/pages/customer_coupons';
import CAddress from './components/customers/pages/customer_address';
import CSetting from './components/customers/pages/customer_setting';
import RestaurantMenu from './components/customers/pages/customer_restaurant';
import CustomerEditAddress from './components/customers/pages/customer_editAddress';
import ViewOrder from './components/customers/pages/customer_viewOrder';
import CCart from './components/customers/pages/customer_cart';
import RHome from './components/delivery_riders/pages/home';

import FHome from './components/fds/pages/home';
import FProfile from './components/fds/pages/profile';
import FProfileEdit from './components/fds/pages/profileEdit';
import FPromos from './components/fds/pages/promos';
import FPromoEdit from './components/fds/pages/promoEdit';
import FCoupons from './components/fds/pages/coupons';
import FCouponEdit from './components/fds/pages/couponEdit';

import ResHome from './components/restaurant_staff/pages/home';
import ResProfile from './components/restaurant_staff/pages/profile';
import ResReview from './components/restaurant_staff/pages/review';
import ResMenu from './components/restaurant_staff/pages/menu';
import ResMenuEdit from './components/restaurant_staff/pages/menuForm';
import ResPromo from './components/restaurant_staff/pages/promo';
import ResPromoEdit from './components/restaurant_staff/pages/promoForm';
import ResOrder from './components/restaurant_staff/pages/order';

import LoginHome from './components/login/home_before_login';
import Login from './components/login/login_page';
import SignUp from './components/signup/signUp';
import RSchedule from "./components/delivery_riders/pages/rider_schedule";
import RDeliveries from "./components/delivery_riders/pages/rider_getDeliveries";
import FTEditSchedule from "./components/delivery_riders/pages/rider_editschedule";
import ROrders from "./components/delivery_riders/pages/rider_getOrders";
import RDetailedOrders from "./components/delivery_riders/pages/rider_getDetailedOrders";
import RDetailedDeliveries from "./components/delivery_riders/pages/rider_getDetailedDeliveries";
import RSummary from "./components/delivery_riders/pages/rider_getSummary";
import RPTSchedule from "./components/delivery_riders/pages/rider_getPTSchedule";
import PTEditSchedule from "./components/delivery_riders/pages/rider_editPTSchedule";
import RProfile from "./components/delivery_riders/pages/rider_profile";

export default function Routes() {

    /* NOTE: LoginHome will need to have auth to autologin if already logged in, i.e. autoredirect to __Home. */

    /* TODO: insert ALL routes here. */
    return (
        <div>
          <Switch>
            <Route exact path='/' component={WithNoAuth(LoginHome)}/>
              
            <Route path='/login' component={(Login)}/>
            <Route path = '/signUp' component= {WithNoAuth(SignUp)}/>

            <Route exact path='/deliveryRider' component={WithRiderAuth(RHome)}/>
            <Route path='/deliveryRider/schedule' component={WithRiderAuth(RSchedule)}/>
            <Route path='/deliveryRider/editSchedule' component={WithRiderAuth(FTEditSchedule)}/>
            <Route path='/deliveryRider/editPTSchedule' component={WithRiderAuth(PTEditSchedule)}/>
            <Route path='/deliveryRider/getDeliveries' component={WithRiderAuth(RDeliveries)}/>
            <Route path='/deliveryRider/getPTSchedule' component={WithRiderAuth(RPTSchedule)}/>
            <Route path='/deliveryRider/getDeliveryDetails' component={WithRiderAuth(RDetailedDeliveries)}/>
            <Route path='/deliveryRider/getOrders' component={WithRiderAuth(ROrders)}/>
            <Route path='/deliveryRider/getOrderDetails' component={WithRiderAuth(RDetailedOrders)}/>
            <Route path='/deliveryRider/summary' component={WithRiderAuth(RSummary)}/>
            <Route path='/deliveryRider/profile' component={WithRiderAuth(RProfile)}/>
            <Route exact path='/restaurant' component={WithResStaffAuth(ResHome)}/>
            <Route path='/fdsManager' component={WithFdsAuth(FHome)}/>
            
            <Route exact path='/fdsManager' component={WithFdsAuth(FHome)}/>
            <Route exact path='/fdsManager/profile' component={WithFdsAuth(FProfile)}/>
            <Route path='/fdsManager/profile/edit' component={WithFdsAuth(FProfileEdit)}/>
            <Route exact path='/fdsManager/promos' component={WithFdsAuth(FPromos)}/>
            <Route path='/fdsManager/promos/edit' component={WithFdsAuth(FPromoEdit)}/>
            <Route exact path='/fdsManager/coupons' component={WithFdsAuth(FCoupons)}/>
            <Route path='/fdsManager/coupons/edit' component={WithFdsAuth(FCouponEdit)}/>

            <Route exact path='/restaurant' component={WithResStaffAuth(ResHome)}/>
            <Route exact path='/restaurant/profile' component={WithResStaffAuth(ResProfile)}/>
            <Route exact path='/restaurant/reviews' component={WithResStaffAuth(ResReview)}/>
            <Route exact path='/restaurant/promos' component={WithResStaffAuth(ResPromo)}/>
            <Route exact path='/restaurant/promos/edit' component={WithResStaffAuth(ResPromoEdit)}/>
            <Route exact path='/restaurant/menu' component={WithResStaffAuth(ResMenu)}/>
            <Route exact path='/restaurant/menu/edit' component={WithResStaffAuth(ResMenuEdit)}/>
            <Route exact path='/restaurant/orders' component={WithResStaffAuth(ResOrder)}/>

            
            <Route exact path='/customer' component={WithCustomerAuth(CHome)}/>
            <Route path='/customer/order' component={WithCustomerAuth(COrder)}/>
            <Route path='/customer/reviews' component= {WithCustomerAuth(CReviews)}/> 
            <Route path='/customer/resMenu' component={WithCustomerAuth(RestaurantMenu)}/>
            <Route path='/customer/coupon' component={WithCustomerAuth(CCoupons)}/>
            <Route path='/customer/address' component={WithCustomerAuth(CAddress)}/>
            <Route path='/customer/editAddress' component={WithCustomerAuth(CustomerEditAddress)}/>
            <Route path='/customer/setting' component={WithCustomerAuth(CSetting)}/>
            <Route path='/customer/cart' component={WithCustomerAuth(CCart)}/>
            <Route path='/customer/current' component={WithCustomerAuth(ViewOrder)}/>
            <Route render={() => <h1>404 Not found</h1>}/>
          </Switch>
        </div>
    );
}

