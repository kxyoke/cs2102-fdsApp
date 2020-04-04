var express = require('express');
var rRouter = express.Router();

const addCoupon = require(`./methods/addCoupon`);
const getCoupon = require(`./methods/getCoupon`);
const updateCoupon = require(`./methods/updateCoupon`);
const addFdsManagerPromo = require(`./methods/addPromo`);
const getAllFdsManagerPromos = require(`./methods/getAllPromos`);
const getFdsManagerPromo = require(`./methods/getPromo`);
const updateFdsManagerPromo = require(`./methods/updatePromo`);

rRouter.route(`/coupon/`)
    .post(addCoupon)

rRouter.route(`/coupon/:cid`)
    .get(getCoupon)
    .put(updateCoupon);

rRouter.route(`promos/`)
    .post(addFdsManagerPromo)
    .get(getAllFdsManagerPromos)

rRouter.route(`promos/:pid`)
    .get(getFdsManagerPromo)
    .put(updateFdsManagerPromo);

module.exports = mRouter;