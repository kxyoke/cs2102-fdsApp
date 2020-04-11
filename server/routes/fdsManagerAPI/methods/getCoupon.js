const pool = require('../../../db'); // psql db
const fmsql = require('../../../sql/manager');

module.exports = (req, res) => {
    log.info('Queried get coupon.');
    const cid = req.params.cid;

    pool.query(fmsql.get.coupon, [cid],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};