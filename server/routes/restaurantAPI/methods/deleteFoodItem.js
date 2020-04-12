const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying delete rMenuItem.');
    //const rid = req.params.rid;
    const fid = req.params.fid;

    pool.query(rsql.del.foodItem, [fid],
        (qerr, qres) => {
            if (qerr) {
                throw qerr;
            }
            res.json(qres.rows)
        })
};

