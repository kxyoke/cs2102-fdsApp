var express = require('express');
var mRouter = express.Router();

const getProfile = require(`./methods/getProfile`);
const updateProfile = require(`./methods/updateProfile`);
const addCoupon = require(`./methods/addCoupon`);
const getCoupon = require(`./methods/getCoupon`);
const updateCoupon = require(`./methods/updateCoupon`);
const addFdsManagerPromo = require(`./methods/addPromo`);
const getAllFdsManagerPromos = require(`./methods/getAllPromos`);
const getFdsManagerPromo = require(`./methods/getPromo`);
const updateFdsManagerPromo = require(`./methods/updatePromo`);

mRouter.route(`/:mid`)
    .get(getProfile)
    .put(updateProfile)

mRouter.route(`/coupon/`)
    .post(addCoupon)

mRouter.route(`/coupon/:cid`)
    .get(getCoupon)
    .put(updateCoupon);

mRouter.route(`/promos`)
    .post(addFdsManagerPromo)
    .get(getAllFdsManagerPromos)

mRouter.route(`/promos/:pid`)
    .get(getFdsManagerPromo)
    .put(updateFdsManagerPromo);

module.exports = mRouter;
