const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    pool.query(risql.function.edit_schedule_by_username, [req.user.usr_id, req.body],
        (q_err, q_res) => {
            console.log(q_err);
            res.json(q_res);
        });
};