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
const getFoodList = require('./methods/getFoodList')
const useCoupon = require('./methods/useCoupon')
const getReviews = require('./methods/viewReview')
cRouter.route('/res')
        .get(getResList);

cRouter.route('/review')
        .get(getReviews);  

cRouter.route('/cart/:cid')
    .get(viewCart)
    .put(emptyCart);

cRouter.route('/cart/:cid/:cartItemId')
        .post(addCartItem)
        .delete(deleteCartItem);

cRouter.get('/menu/:rid', getResMenu);

cRouter.route('/profile')
        .get(getCProfile)
        .put(updateCProfile);

cRouter.route('/address')
        .get(getAddresses)
        .post(updateAddress);
cRouter.route('/card')
        .get(getCardInfo);
cRouter.route('/order')
        .get(getPastOrders);
cRouter.get('/order/foodList', getFoodList);

cRouter.route('coupon/')
        .get(getCoupons)
        .put(useCoupon);

module.exports = cRouter;

