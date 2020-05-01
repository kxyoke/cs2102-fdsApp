const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying delete rMenuItem.');
    const rid = req.params.rid;
    const fid = req.params.fid;

    pool.query(rsql.del.foodItem, [rid,fid],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr);
                res.status(500).send(qerr);
            } else {
                res.sendStatus(200)
            }
        })
};

