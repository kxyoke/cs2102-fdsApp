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
const getOrderDetails = require('./methods/getOrderDetails');
const updateDeliveryTime = require('./methods/updateDeliveryTime');

riRouter.route('/profile')
   .get(getProfile)
   .put(updateProfile);

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

riRouter.route('/orders/:oid')
    .get(getOrderDetails);

module.exports = riRouter;

