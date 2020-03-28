var express = require('express')
var cRouter = express.Router()

//cart
const viewCart = require('./methods/viewCart')
const addCartItem = require('./methods/addCartItem')
const deleteCartItem = require('./methods/deleteCartItems')
const emptyCart = require('./methods/emptyCart')

//restaurant
const getResList = require('./methods/getResList')
const getResMenu = require('./methods/getRestMenu')

//customer
const getCProfile = require('./methods/getCProfile')
const updateCProfile = require('./methods/updateCProfile')
const getAddresses = require('./methods/getAddresses')
const updateAddress = require('./methods/updateAddress')
const getCardInfo = require('./methods/getCardInfo')
const getCoupons = require('./methods/getCoupons')
const getPastOrders = require('./methods/getPastOrder')
const useCoupon = require('./methods/useCoupon')

cRouter.route('/')
        .get(getResList);

cRouter.route('/cart/:cid')
    .get(viewCart)
    .put(emptyCart);

cRouter.route('/cart/:cid/:cartItemId')
        .post(addCartItem)
        .delete(deleteCartItem);

cRouter.route('/:rid')
    .get(getResMenu);

cRouter.route('/:cid')
        .get(getCProfile)
        .put(updateCProfile);

cRouter.route('/address/:cid')
        .get(getAddresses)
        .post(updateAddress);
cRouter.route('/card/:cid')
        .get(getCardInfo);
cRouter.route('/order/:cid')
        .get(getPastOrders);

cRouter.route('coupon/:cid/:cpid')
        .get(getCoupons)
        .put(useCoupon);

module.exports = cRouter;

