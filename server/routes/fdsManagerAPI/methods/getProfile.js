const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const fmsql = require('../../../sql/manager');

module.exports = (req, res) => {
    log.info('Queried get fdsManager profile.');
    const mid = req.user.usr_id;

    pool.query(fmsql.get.profile, [mid],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};