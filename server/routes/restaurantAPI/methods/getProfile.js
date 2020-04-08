const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql');

/* Req params should have:
 *  - rid
 */
module.exports = (req, res) => {
    log.info('Querying add rProfile.');
    const rid = req.params.rid;

    pool.query(rsql.queries.get.profile, [rid],
        (qerr, qres) => {
            if (qerr) {
                throw qerr;
            }
            res.json(qres.rows)
        })
};

