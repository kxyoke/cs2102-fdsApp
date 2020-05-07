const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');
module.exports = (req, res) => {
    pool.query(risql.queries.find_schedule_by_username, [req.user.usr_id],
        (q_err, q_res) => {
            res.status(200).json(q_res.rows)
        });
};