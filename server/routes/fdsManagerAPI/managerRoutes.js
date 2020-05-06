var express = require('express');
var mRouter = express.Router();

const getProfile = require('./methods/getProfile');
const updateProfile = require('./methods/updateProfile');
const addCoupon = require('./methods/addCoupon');
const getCoupons = require('./methods/getCoupons');
const updateCoupon = require('./methods/updateCoupon');
const addFdsManagerPromo = require('./methods/addPromo');
const getFdsManagerPromos = require('./methods/getPromos');
const updateFdsManagerPromo = require('./methods/updatePromo');
const getCustomerSummary = require('./methods/getCustomerSummary');
const getGeneralSummary = require('./methods/getGeneralSummary');
const getLocationSummary = require('./methods/getLocationSummary');
const getRiderSummary = require('./methods/getRiderSummary');

mRouter.route('/summary/general')
    .get(getGeneralSummary)

mRouter.route('/summary/customer')
    .get(getCustomerSummary)

mRouter.route('/summary/location')
    .get(getLocationSummary)

mRouter.route('/summary/rider')
    .get(getRiderSummary)

mRouter.route('/profile')
    .get(getProfile)
    .put(updateProfile)

mRouter.route('/coupons/')
    .post(addCoupon)
    .get(getCoupons)

mRouter.route('/coupons/:couponGroupId')
    .put(updateCoupon);

mRouter.route('/promos')
    .post(addFdsManagerPromo)
    .get(getFdsManagerPromos)

mRouter.route('/promos/:pid')
    .put(updateFdsManagerPromo);

module.exports = mRouter;
