const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get fdsManager customer summary.');
    const { month } = req.body;

    pool.query(sql.fdsManager.functions.get_customer_summary, [month],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};