const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {

    pool.query(risql.queries.get_part_time_schedule, [req.user.usr_id],
        (q_err, q_res) => {
            console.log(q_res);
            res.json(q_res.rows)
    });
};