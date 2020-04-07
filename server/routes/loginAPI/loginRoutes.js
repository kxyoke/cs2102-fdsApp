const lRouter = require('express').Router();
const {checkAuthenticated, checkNotAuthenticated} = require('../../auth/middleware')
const passport = require('passport')
// possibly import auth handler: if alr authed, redirect to authed home

const loginAsCustomer = require('./methods/loginAsCustomer');
const loginAsRestaurant = require('./methods/loginAsRestaurant');
const loginAsRider = require('./methods/loginAsRider');
const loginAsFdsM = require('./methods/loginAsFdsManager');

lRouter.post('/customer',loginAsCustomer);


lRouter.route('/restaurant')
    .post(checkNotAuthenticated, loginAsRestaurant);
lRouter.route('/deliveryRider')
    .post(checkNotAuthenticated, loginAsRider);
lRouter.route('/fdsManager')
    .post(checkNotAuthenticated,loginAsFdsM);

module.exports = lRouter;

