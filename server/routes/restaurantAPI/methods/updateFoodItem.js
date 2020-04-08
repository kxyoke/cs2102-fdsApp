const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql');

/*
 */
module.exports = (req, res) => {
    log.info('Querying upate rMenuItem.');

    pool.query(rsql.queries.update.foodItem,
        [fid, price, dailyLmt, name, desc, imgPath],
        (qerr, qres) => {
            res.send(qres)
        })
};

