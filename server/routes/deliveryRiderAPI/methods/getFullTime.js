const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {

    pool.query(risql.queries.get_full_time_rider, [req.user.usr_id],
        (q_err, q_res) => {
            console.log(q_res);
            res.json(q_res.rows)
    });
};