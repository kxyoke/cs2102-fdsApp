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
const updateDeliveryTime = require('./methods/updateDeliveryTime');

riRouter.route('/:riid')
   .get(getProfile)
   .put(updateProfile);

riRouter.route('/schedule/:riid')
   .get(getWorkSchedule)
   .put(updateWorkSchedule);

riRouter.route('/deliveries/:riid')
   .get(getDeliveries);

riRouter.route('/deliveries/:riid/:oid')
    .get(getOrder)
    .put(updateDeliveryTime);