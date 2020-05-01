const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying update rOrder is prepared.');
    const oid = req.params.oid;

    pool.query(rsql.update.orderIsPrepared, [oid],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr)
                res.status(500).send(qerr);
            }
            res.sendStatus(200)
        })
};

