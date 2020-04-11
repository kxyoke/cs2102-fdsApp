const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const fmsql = require('../../../sql/manager');

module.exports = (req, res) => {
    log.info('Queried get all fdsManager promos.');

    pool.query(fmsql.get.allPromos,
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json(data.rows);
        })
};