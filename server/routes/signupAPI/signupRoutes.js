const suRouter = require('express').Router();

// possibly import auth handler: if alr authed, redirect to authed home

const signupAsCustomer = require('./methods/signupAsCustomer');
const signupAsRestaurant = require('./methods/signupAsRestaurant');
const signupAsRider = require('./methods/signupAsRider');
const signupAsFdsM = require('./methods/signupAsFdsManager');

suRouter.route('/customer')
    .post(signupAsCustomer);
suRouter.route('/restaurant')
    .post(signupAsRestaurant);
suRouter.route('/deliveryRider')
    .post(signupAsRider);
suRouter.route('/fdsManager')
    .post(signupAsFdsM);

module.exports = suRouter;

