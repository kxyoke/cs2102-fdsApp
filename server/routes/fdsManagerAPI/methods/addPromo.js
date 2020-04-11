const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const fmsql = require('../../../sql/manager');

module.exports = (req, res) => {
    log.info('Queried add fdsManager promo.');
    const pid = req.params.pid;
    const ptype = req.body.ptype;
    const pdesc = req.body.description;
    const startDay = req.body.start_day;
    const endDay = req.body.end_day;

    pool.query(fmsql.add.promo, [pid, ptype, pdesc, startDay, endDay],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};