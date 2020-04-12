const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get coupon.');
    const cid = req.params.cid;

    pool.query(sql.fdsManager.get.coupon, [cid],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};