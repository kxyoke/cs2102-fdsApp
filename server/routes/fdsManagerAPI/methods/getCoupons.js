const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get coupon.');

    pool.query(sql.fdsManager.queries.get_coupons,
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};