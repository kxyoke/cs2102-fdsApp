const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get fdsManager rider summary.');
    const { month } = req.query;

    pool.query(sql.fdsManager.functions.get_rider_summary, [month],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};