const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried update coupon.');
    const cid = req.params.cid;
    const cdesc = req.body.description;
    const expDate = req.body.expiry_date;

    pool.query(sql.fdsManagerupdate.coupon, [cid, cdesc, expDate],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};