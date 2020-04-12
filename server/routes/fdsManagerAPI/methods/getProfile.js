const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get fdsManager profile.');
    const mid = req.user.usr_id;

    pool.query(sql.fdsManager.get.profile, [mid],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};