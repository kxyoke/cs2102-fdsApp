const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying update rMenuItem category.');
    const fid = req.params.fid;
    const cat = req.body.category;

    pool.query(rsql.update.foodItemCategory, [fid, cat],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr)
                res.status(500).send(qerr)
            } else {
                res.sendStatus(200)
            }
        })
};

