const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const fmsql = require('../../../sql/manager');

module.exports = (req, res) => {
    log.info('Queried add coupon.');
    const cid = req.params.cid;
    const cdesc = req.body.description;
    const expDate = req.body.expiry_date;

    pool.query(fmsql.add.coupon, [cid, cdesc, expDate],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};