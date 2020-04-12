const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    pool.query(risql.function.edit_schedule_by_username, [req.user.usr_id, req.body],
        (q_err, q_res) => {
            if (q_err) {
                res.sendStatus(422);
            } else {
                res.json(q_res);
            }
        });
};