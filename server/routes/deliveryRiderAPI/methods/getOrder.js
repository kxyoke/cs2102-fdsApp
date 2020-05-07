const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {

    pool.query(risql.queries.get_available_orders, ["pending"],
        (q_err, q_res) => {
            console.log(q_res);
            console.log(q_err)
            res.json(q_res.rows)
        });
};