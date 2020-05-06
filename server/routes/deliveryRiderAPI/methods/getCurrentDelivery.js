const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {

    pool.query(risql.queries.get_current_deliveries, [req.user.usr_id, "in progress"],
        (q_err, q_res) => {
            console.log(q_res);
            console.log("HI")
            res.json(q_res.rows)
        });
};