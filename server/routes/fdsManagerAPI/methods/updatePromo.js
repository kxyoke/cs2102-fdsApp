const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried update fdsManager promo.');
    const pid = req.params.pid;
    const ptype = req.body.ptype;
    const pdesc = req.body.description;
    const startDay = req.body.start_day;
    const endDay = req.body.end_day;

    pool.query(sql.fdsManager.update.promo, [pid, ptype, pdesc, startDay, endDay],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};