const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying get future rPromos.');
    const rid = req.params.rid;

    pool.query(rsql.get.allFuturePromos, [rid],
        (qerr, qres) => {
            if (qerr) {
                throw qerr;
            }
            res.json(qres.rows)
        })
};

