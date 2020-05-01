const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying update rMenuItem availability.');
    const fid = req.params.fid;
    const avail = req.body.avail;

    pool.query(rsql.update.foodItemAvailability, [fid, avail],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr)
                res.status(500).send(qerr)
            } else {
                res.sendStatus(200)
            }
        })
};

