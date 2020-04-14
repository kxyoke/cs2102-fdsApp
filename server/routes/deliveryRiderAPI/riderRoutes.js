var express = require('express');
var riRouter = express.Router();

const getProfile = require('./methods/getProfile');
const updateProfile = require('./methods/updateProfile');

//work schedule
const getWorkSchedule = require('./methods/getWorkSchedule');
const updateWorkSchedule = require('./methods/updateWorkSchedule');

//delivery
const getDeliveries = require('./methods/getDeliveries');
const getOrder = require('./methods/getOrder');
const getCurrentOrder = require('./methods/getCurrentOrder');
const getCurrentDelivery = require('./methods/getCurrentDelivery');
const getOrderDetails = require('./methods/getOrderDetails');
const updateDeliveryTime = require('./methods/updateDeliveryTime');
const postIsRiderDriving = require('./methods/postIsRiderDriving');
const updateOrder =  require('./methods/updateOrder');

riRouter.route('/profile')
   .get(getProfile)
   .put(updateProfile);

riRouter.route('/home/delivery')
    .get(getCurrentDelivery)

riRouter.route('/schedule/:riid')
   .get(getWorkSchedule)
   .post(updateWorkSchedule);

riRouter.route('/deliveries/:riid')
   .get(getDeliveries);

riRouter.route('/deliveries/:riid/:oid')
    .get(getCurrentOrder)
    .put(updateDeliveryTime);

riRouter.route('/orders')
    .get(getOrder);

riRouter.route('/updateOrder')
    .post(updateOrder);

riRouter.route('/orders/:oid')
    .get(getOrderDetails)
    .post(postIsRiderDriving);


module.exports = riRouter;

