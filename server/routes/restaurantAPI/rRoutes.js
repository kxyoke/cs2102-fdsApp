var express = require('express');
var rRouter = express.Router();

// import functions? as consts
// possibly import the auth handler
//const authHandler = require('../auth/?')

const getRestaurant = require('./methods/getProfile');
const updateRestaurant = require('./methods/updateProfile');
const addMenuFoodItem = require('./methods/addMenuFoodItem');
const getFoodCategories = require('./methods/getFoodCategories');
const getRestaurantMenuItems = require('./methods/getMenu');
const getFoodItem = require('./methods/getFoodItem');
const updateFoodItem = require('./methods/updateFoodItem');
const updateFoodItemCategory = require('./methods/updateFoodItemCategory');
const deleteFoodItem = require('./methods/deleteFoodItem');
const getRestaurantReviews = require('./methods/getReviews');
const getRestaurantOrders = require('./methods/getOrders');
const getRestaurantPromos = require('./methods/getPromos');
const addRestaurantPromo = require('./methods/addPromo');
const updateRestaurantPromo = require('./methods/updatePromo');

rRouter.route('/:rid')
    .get(getRestaurant)
    .put(updateRestaurant);

rRouter.route('/menu/:rid')
    .post(addMenuFoodItem)
    .get(getRestaurantMenuItems);

rRouter.route('/menu/:rid/:fid')
    .get(getFoodItem)
    .put(updateFoodItem)
    .delete(deleteFoodItem);

rRouter.route('/menu/category')
    .get(getFoodCategories);

rRouter.route('/menu/category/:fid')
    .put(updateFoodItemCategory);

rRouter.route('/reviews/:rid')
    .get(getRestaurantReviews);

rRouter.route('/orders/:rid')
    .get(getRestaurantOrders);

rRouter.route('/promos/:rid')
    .get(getRestaurantPromos)
    .post(addRestaurantPromo);

rRouter.route('/promos/:rid/:pid')
    .put(updateRestaurantPromo);

module.exports = rRouter;

