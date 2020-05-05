const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried update fdsManager promo.');
    const { pid, start_day, end_day, promoType, discountType, discountValue } = req.body;
    const startDate = new Date(start_day);
    const endDate = new Date(end_day);
    var pdesc = null;
    var errorMessage = "default error message";
    const discountRegex = /^(?:\d*\.\d{1,2}|\d+)$/;
 
    if (endDate <= startDate) {
        errorMessage = "End date/time cannot be the same as or before start date/time.";
    } else if (promoType == 'delivery') {
        pdesc = "Delivery:percent;100";
    } else if (promoType == 'discount' && discountValue == null) {
        errorMessage = "Please enter a discount value.";
    } else if (!discountRegex.test(discountValue)) {
        errorMessage = "Discount value should only be numeric and have up to 2 decimals.";
    } else {
        if (discountType == 'dollars') {
            pdesc = "Discount:dollars;" + discountValue;
        } else {
            pdesc = "Discount:percent;" + discountValue;
        }
    }

    pool.query(sql.fdsManager.queries.update_promo, [pid, pdesc, start_day, end_day],
        (err, data) => {
            if (err) {
                return res.status(409).send(errorMessage);
            }
            res.json(data.rows);
        })
};