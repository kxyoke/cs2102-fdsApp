const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    pool.query(risql.queries.get_recent_deliveries, [req.user.usr_id],
        (q_err, q_res) => {
            console.log(q_err);
            res.status(200).json(q_res.rows)
    });
};