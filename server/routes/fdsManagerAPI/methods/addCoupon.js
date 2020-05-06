const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');
const shortid = require('shortid');

module.exports = (req, res) => {
    log.info('Queried add coupon.');
    const { expiry_date, couponType, discountType, discountValue, targetCustomers, customerActivity } = req.body;
    const coupon_group_id = shortid.generate();
    const expDate = new Date(expiry_date);
    var cdesc = null;
    var errorMessage = "default error message";
    const discountRegex = /^(?:\d*\.\d{1,2}|\d+)$/;
    const activityRegex = /^\d+$/;

    if (customerActivity == null) {
        errorMessage = "Please enter the desired customer activity.";
    } else if (!activityRegex.test(customerActivity)) {
        errorMessage = "Customer activity should only be whole numbers.";
    } else if (couponType == 'delivery') {
        cdesc = "Delivery:percent;100";
    } else if (couponType == 'discount' && discountValue == null) {
        errorMessage = "Please enter a discount value.";
    } else if (!discountRegex.test(discountValue)) {
        errorMessage = "Discount value should only be numeric and have up to 2 decimals.";
    } else {
        if (discountType == 'dollars') {
            cdesc = "Discount:dollars;" + discountValue;
        } else {
            cdesc = "Discount:percent;" + discountValue;
        }
    }

    pool.query(sql.fdsManager.queries.add_coupon, [coupon_group_id, cdesc, expDate, targetCustomers, customerActivity],
        (err, data) => {
            if (err) {
                //return res.status(409).send(errorMessage);
                throw err;
            }
            res.json(data.rows);
        })
};