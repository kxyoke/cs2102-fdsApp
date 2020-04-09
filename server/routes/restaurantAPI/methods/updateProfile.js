const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurantQueries/queries');

module.exports = (req, res) => {
    log.info('Querying update rProfile.');
    const rid = req.params.rid;
    const rname = req.body.rname;
    const addr = req.body.address;
    const minAmt = req.body.min_amount;

    pool.query(rsql.update.profile, [rid, rname, addr, minAmt],
        (qerr, qres) => {
            if (qerr) {
                throw qerr;
            }
            res.json(qres.rows)
        })
};

