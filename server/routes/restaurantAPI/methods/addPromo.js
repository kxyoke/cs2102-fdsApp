const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');


module.exports = (req, res) => {
    log.info('Querying add rPromo.');
    const rid = req.params.rid;
    const pid = req.body.pid;
    const pdesc = req.body.description;
    const startDay = req.body.start_day;
    const endDay = req.body.end_day;

    pool.query(rsql.add.promo,
        [pid, rid, pdesc, startDay, endDay],
        (qerr, qres) => {
            if (qerr) {
                throw qerr;
            }
            res.json(qres.rows)
        })
};

