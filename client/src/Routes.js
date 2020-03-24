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

import Login from './components/login/login_page';

export default function Routes() {

    function Home() {
        return <h1>Home ya, probs gonna change when legit</h1>;
    }

    function Customer() {
        let match = useRouteMatch();

        return (
            <div>
              <h2>Customer App</h2>
              <ul>
                <li>
                  <Link to={'${match.url}/order'}>Order</Link>
                </li>
              </ul>

              <Switch>
                <Route path={'${match.path}/order'}>
                  <COrder />
                </Route>
                <Route path={match.path}>
                  <CHome />
                </Route>
              </Switch>
            </div>
        );
    }

    return (
        <div>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/customer'>Customer Home</Link>
              </li>
            </ul>
          </nav>

          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/customer'>
              <Customer />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
    );
}

