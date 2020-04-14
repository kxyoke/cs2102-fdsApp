const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    console.log(req.body);
    pool.query(risql.function.update_delivery_time, [req.user.usr_id, req.body[0]],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                res.sendStatus(422);
            } else {
                res.json(q_res);
            }
        });
};