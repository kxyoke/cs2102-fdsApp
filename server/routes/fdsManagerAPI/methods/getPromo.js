const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const fmsql = require('../../../sql/manager');

module.exports = (req, res) => {
    log.info('Queried get fdsManager promo.');
    const pid = req.params.pid;

    pool.query(fmsql.get.promo, [mid],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};