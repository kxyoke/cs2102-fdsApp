const suRouter = require('express').Router();

// possibly import auth handler: if alr authed, redirect to authed home

const signupAsCustomer = require('./methods/signupAsCustomer');
const signupAsRestaurant = require('./methods/signupAsRestaurant');
const signupAsRider = require('./methods/signupAsRider');

const getExistingRestaurants = require('./methods/getExistingRestaurants');

suRouter.route('/customer')
    .post(signupAsCustomer);
suRouter.route('/restaurantStaff')
    .post(signupAsRestaurant);
suRouter.route('/deliveryRider')
    .post(signupAsRider);

suRouter.route('/restaurant')
    .get(getExistingRestaurants);

module.exports = suRouter;

