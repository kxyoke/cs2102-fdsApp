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
const getAddresses = require('./methods/getAddresses')
const updateAddress = require('./methods/updateAddress')
const deleteAddress = require('./methods/deleteAddress')
const getCardInfo = require('./methods/getCardInfo')
const getCoupons = require('./methods/getCoupons')
const getPastOrders = require('./methods/getPastOrder')

const useCoupon = require('./methods/useCoupon')
const getReviews = require('./methods/viewReview')
cRouter.route('/res')
        .get(getResList);

cRouter.route('/review')
        .get(getReviews);  

cRouter.route('/cart')
    .get(viewCart)
    .post(updateCartItem);
    
cRouter.post('/cart/add/',
        addCartItem)


    

// cRouter.route('/cart/:cid/:cartItemId')
//         .post()
//         .delete(deleteCartItem);

cRouter.get('/menu/:rid', getResMenu);

cRouter.route('/profile')
        .get(getCProfile)
        .put(updateCProfile);

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

module.exports = cRouter;

