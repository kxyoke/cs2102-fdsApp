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

const getPastOrders = require('./methods/getPastOrder')
const placeOrder = require('./methods/placeOrder')

const getCoupons = require('./methods/getCoupons')
const getUsableCoupon = require('./methods/getUsableCoupon')
const getRewardPoints = require('./methods/getRewardPoints')
const getReviews = require('./methods/viewReview')
const getPendingReviews = require('./methods/getPendingReview')
const addReviews = require('./methods/addReviews')
const ordersNotComplete = require('./methods/isOrderNotcomplete')
const inCompleteOrder = require('./methods/inCompleteOrders')
const delivery = require('./methods/getDelivery')

const fdsPromo = require('./methods/getFDSpromo')
const resPromo = require('./methods/getResPromo')
const allPromo = require('./methods/getCurrentPromo')

cRouter.route('/res')
        .get(getResList);

cRouter.get('/status',ordersNotComplete);
cRouter.get('/processingOrder/', inCompleteOrder);

cRouter.get('/delivery/:order_id', delivery)

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

cRouter.get('/rewardPoints', getRewardPoints);

cRouter.get('/usableCoupon',getUsableCoupon)

cRouter.post('/placeOrder', placeOrder);

cRouter.get('/promo/res/:res_id', resPromo);
cRouter.get('/promo/fds', fdsPromo);
cRouter.get('/promo/current', allPromo);

module.exports = cRouter;

