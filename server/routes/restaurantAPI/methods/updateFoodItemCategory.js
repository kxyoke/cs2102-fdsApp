const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

/*
 */
module.exports = (req, res) => {
    log.info('Querying update rMenuItem category.');
    const fid = req.params.fid;
    const cat = req.body.category;

    pool.query(rsql.update.foodItemCategory, [fid, cat],
        (qerr, qres) => {
            res.send(qres)
        })
};

