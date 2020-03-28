const lRouter = require('express').Router();

// possibly import auth handler: if alr authed, redirect to authed home

const loginAsCustomer = require('./methods/loginAsCustomer');
const loginAsRestaurant = require('./methods/loginAsRestaurant');
const loginAsRider = require('./methods/loginAsRider');
const loginAsFdsM = require('./methods/loginAsFdsManager');

lRouter.route('/customer')
    .post(loginAsCustomer);
lRouter.route('/restaurant')
    .post(loginAsRestaurant);
lRouter.route('/deliveryRider')
    .post(loginAsRider);
lRouter.route('/fdsManager')
    .post(loginAsFdsM);

module.exports = lRouter;

