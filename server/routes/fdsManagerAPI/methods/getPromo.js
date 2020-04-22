const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get fdsManager promo.');
    const pid = req.params.pid;

    pool.query(sql.fdsManager.get.promo, [req.user.usr_id],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.send(data.rows);
        })
};