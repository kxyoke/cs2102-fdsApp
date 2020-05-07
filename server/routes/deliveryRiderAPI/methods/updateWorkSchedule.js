const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    pool.query(risql.function.edit_schedule_by_username, [req.user.usr_id, req.body],
        (q_err, q_res) => {
            if (q_err) {
                res.status(422).send(q_err.message);
            } else {
                console.log(q_res);
                console.log("HI");
                res.json(q_res);
            }
        });
};