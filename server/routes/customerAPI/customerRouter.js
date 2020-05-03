var express = require('express')
var cRouter = express.Router()

//cart
const viewCart = require('./methods/viewCart')
const addCartItem = require('./methods/addCartItem')
const updateCartItem = require('./methods/updateCartItemQty')


//restaurant
const getResList = require('./methods/getResList')
const getResMenu = require('./methods/getRestMenu')

//customer
const getCProfile = require('./methods/getCProfile')
const updateCProfile = require('./methods/updateCProfile')
const deleteAccount = require('./methods/deleteAccount')
const getAddresses = require('./methods/getAddresses')
const updateAddress = require('./methods/updateAddress')
const deleteAddress = require('./methods/deleteAddress')
const getCardInfo = require('./methods/getCardInfo')
const getCoupons = require('./methods/getCoupons')
const getPastOrders = require('./methods/getPastOrder')
const placeOrder = require('./methods/placeOrder')

const useCoupon = require('./methods/useCoupon')
const getReviews = require('./methods/viewReview')
const getPendingReviews = require('./methods/getPendingReview')
const addReviews = require('./methods/addReviews')

cRouter.route('/res')
        .get(getResList);

cRouter.route('/review')
        .get(getReviews)
        .post(addReviews);  
cRouter.route('/review/pending')
        .get(getPendingReviews); 

cRouter.route('/cart')
    .get(viewCart)
    .post(updateCartItem);
    
cRouter.post('/cart/add/',
        addCartItem)

cRouter.get('/menu/:rid', getResMenu);

cRouter.route('/profile')
        .get(getCProfile)
        .post(updateCProfile);


cRouter.route('/address')
        .get(getAddresses)
        .post(updateAddress);

cRouter.post('/address/delete', deleteAddress)      
cRouter.route('/card')
        .get(getCardInfo);

cRouter.route('/order')
        .get(getPastOrders);

cRouter.route('/coupon')
        .get(getCoupons)
        .put(useCoupon);

cRouter.post('/placeOrder', placeOrder);

module.exports = cRouter;

