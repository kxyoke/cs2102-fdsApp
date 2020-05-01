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

    if (couponType == 'delivery') {
        cdesc = "FDS-wide free delivery";
    } else if (couponType == 'discount' && discountValue == null) {
        errorMessage = "Please enter a discount value.";
    } else if (!discountRegex.test(discountValue)) {
        errorMessage = "Discount value should only be numeric and have up to 2 decimals.";
    } else if (couponType == 'discount' && customerActivity == null) {
        errorMessage = "Please enter the desired customer activity.";
    } else if (!activityRegex.test(customerActivity)) {
        errorMessage = "Customer activity should only be whole numbers.";
    } else {
        if (discountType == 'dollars') {
            cdesc = "$" + discountValue + " discount for ";
        } else {
            cdesc = discountValue + "% discount for ";
        }

        if (targetCustomers == 'inactive') {
            cdesc += "inactive customers during the past ";
        } else {
            cdesc += "active customers during the past ";
        }

        cdesc += customerActivity + " month/s";
    }

    pool.query(sql.fdsManager.queries.add_coupon, [coupon_group_id, cdesc, expDate],
        (err, data) => {
            if (err) {
                return res.status(409).send(errorMessage);
            }
            res.json(data.rows);
        })
};