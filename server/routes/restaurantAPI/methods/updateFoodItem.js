const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurantQueries/queries');

/*
 */
module.exports = (req, res) => {
    log.info('Querying upate rMenuItem.');

    pool.query(rsql.update.foodItem,
        [fid, price, dailyLmt, name, desc, imgPath],
        (qerr, qres) => {
            res.send(qres)
        })
};

