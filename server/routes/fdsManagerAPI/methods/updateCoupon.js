const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried update coupon.');
    const { coupon_group_id, expiry_date, couponType, discountType, discountValue, targetCustomers, customerActivity } = req.body;
    const expDate = new Date(expiry_date);
    var cdesc = null;
    var errorMessage = "default error message";
    const discountRegex = /^(?:\d*\.\d{1,2}|\d+)$/;
    const activityRegex = /^\d+$/;

    if (couponType == 'delivery') {
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

    pool.query(sql.fdsManager.queries.update_coupon, [coupon_group_id, cdesc, expDate],
        (err, data) => {
            if (err) {
                return res.status(409).send(errorMessage);
            }
            res.json(data.rows);
        })
};