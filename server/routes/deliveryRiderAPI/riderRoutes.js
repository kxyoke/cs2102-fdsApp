var express = require('express');
var riRouter = express.Router();

const getProfile = require('./methods/getProfile');
const updateProfile = require('./methods/updateProfile');

//work schedule
const getWorkSchedule = require('./methods/getWorkSchedule');
const updateWorkSchedule = require('./methods/updateWorkSchedule');
const getPartTimeSchedule = require('./methods/getPartTimeSchedule');
const updatePartTimeSchedule = require('./methods/updatePartTimeSchedule');
//delivery
const getDeliveries = require('./methods/getDeliveries');
const getOrder = require('./methods/getOrder');
const getCurrentOrder = require('./methods/getCurrentOrder');
const getCurrentDelivery = require('./methods/getCurrentDelivery');
const getOrderDetails = require('./methods/getOrderDetails');
const updateDeliveryTime = require('./methods/updateDeliveryTime');
const postIsRiderDriving = require('./methods/postIsRiderDriving');
const updateOrder =  require('./methods/updateOrder');
const getSummaryOrders = require('./methods/getSummaryOrders');
const getSummarySalary = require('./methods/getSummarySalary');
const getSummaryWorkingHours = require('./methods/getSummaryWorkingHours');
const getFullTime = require('./methods/getFullTime');

riRouter.route('/profile')
   .get(getProfile)
   .post(updateProfile);

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

riRouter.route('/summary/orders')
    .get(getSummaryOrders);

riRouter.route('/summary/salary')
    .get(getSummarySalary);

riRouter.route('/summary/hours')
    .get(getSummaryWorkingHours);

riRouter.route('/checkFullTime')
    .get(getFullTime);

riRouter.route('/parttimeschedule')
    .get(getPartTimeSchedule)
    .post(updatePartTimeSchedule);

module.exports = riRouter;

