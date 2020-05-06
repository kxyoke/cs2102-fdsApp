const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying all food categories atm.')

    pool.query(rsql.get.allFoodCategories,
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                res.status(500).send(q_err)
            }
            res.json(q_res.rows)
        })
};

