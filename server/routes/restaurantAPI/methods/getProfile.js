const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

/* Req params should have:
 *  - rid
 */
module.exports = (req, res) => {
    log.info('Querying get rProfile.');
    const rid = req.params.rid;

    pool.query(rsql.get.profile, [rid],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr);
                res.status(500).send(qerr)
            } else {
                res.json(qres.rows)
            }
        })
};

