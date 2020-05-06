const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying r food categories.')
    const rid = req.params.rid;

    pool.query(rsql.get.rFoodCategories, [rid],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err)
                res.status(500).send(q_err)
            } else {
                let cats = [];
                for (var i = 0; i < q_res.rows.length; i++) {
                    cats.push(q_res.rows[i].category)
                }
                log.info("submitted " + JSON.stringify(cats))
                res.json(cats)
            }
        })
};

