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
