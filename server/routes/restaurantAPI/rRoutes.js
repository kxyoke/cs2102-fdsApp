var express = require('express');
var rRouter = express.Router();

const retrieveStaffIdAndRid = require('./methods/getStaffAndRidFromSession');
const updateUserPwd = require('./methods/updateUserPwd');
const updateResPwd = require('./methods/updateResPwd');

const getRestaurant = require('./methods/getProfile');
const updateRestaurant = require('./methods/updateProfile');

const statsNumOrders = require('./methods/statsNumOrders');
const statsTotalCost = require('./methods/statsTotalCostOrders');
const statsTop5Favs = require('./methods/statsTop5Favs');

const addMenuFoodItem = require('./methods/addMenuFoodItem');
const getFoodCategories = require('./methods/getFoodCategories');
const getRestaurantFoodCategories = require('./methods/getRestaurantFoodCategories');
const getRestaurantMenuItems = require('./methods/getMenu');
const getFoodItem = require('./methods/getFoodItem');
const updateFoodItem = require('./methods/updateFoodItem');
const updateFoodAvailability = require('./methods/updateFoodAvailability');
const updateFoodItemCategory = require('./methods/updateFoodItemCategory');
const deleteFoodItem = require('./methods/deleteFoodItem');

const updateFoodSold = require('./methods/updateFoodSold');

const getRestaurantReviews = require('./methods/getReviews');

const getRestaurantCurrentOrders = require('./methods/getCurrentOrders');
const getRestaurantCompletedOrders = require('./methods/getCompletedOrders');
const setOrderIsPrepared = require('./methods/updateOrderIsPrepared');

const getRestaurantPromos = require('./methods/getPromos');
const addRestaurantPromo = require('./methods/addPromo');
const updateRestaurantPromo = require('./methods/updatePromo');

const getActiveRPromos = require('./methods/getActivePromos');
const getFutureRPromos = require('./methods/getFuturePromos');
const getPastRPromos = require('./methods/getPastPromos');

rRouter.route('/')
    .get(retrieveStaffIdAndRid);

rRouter.route('/:rid')
    .get(getRestaurant)
    .put(updateRestaurant);

rRouter.route('/userPwd/:uid')
    .put(updateUserPwd);
rRouter.route('/resPwd/:rid')
    .put(updateResPwd);

rRouter.route('/menu/:rid')
    .post(addMenuFoodItem)
    .get(getRestaurantMenuItems);

rRouter.route('/menu/:rid/:fid')
    .get(getFoodItem)
    .put(updateFoodItem)
    .delete(deleteFoodItem);

rRouter.route('/menu/:rid/:fid/sold')
    .put(updateFoodSold);

rRouter.route('/menu/:rid/:fid/makeAvailable')
    .put(updateFoodAvailability);

rRouter.route('/foodCategories/all')
    .get(getFoodCategories);

rRouter.route('/foodCategories/:rid')
    .get(getRestaurantFoodCategories);

rRouter.route('/foodCategories/change/:fid')
    .put(updateFoodItemCategory);

rRouter.route('/reviews/:rid')
    .get(getRestaurantReviews);

rRouter.route('/orders/current/:rid')
    .get(getRestaurantCurrentOrders);
rRouter.route('/orders/completed/:rid')
    .get(getRestaurantCompletedOrders);
rRouter.route('/orders/setPrepared/:oid')
    .put(setOrderIsPrepared);

rRouter.route('/promos/all/:rid')
    .get(getRestaurantPromos)
    .post(addRestaurantPromo);

rRouter.route('/promos/active/:rid')
    .get(getActiveRPromos);
rRouter.route('/promos/future/:rid')
    .get(getFutureRPromos);
rRouter.route('/promos/past/:rid')
    .get(getPastRPromos);

rRouter.route('/promos/specific/:rid/:pid')
    .put(updateRestaurantPromo);

rRouter.route('/stats/orders/num/:rid/:startDate/:endDate')
    .get(statsNumOrders);
rRouter.route('/stats/orders/earnings/:rid/:startDate/:endDate')
    .get(statsTotalCost);
rRouter.route('/stats/favFoods/:rid/:startDate/:endDate')
    .get(statsTop5Favs);

module.exports = rRouter;

