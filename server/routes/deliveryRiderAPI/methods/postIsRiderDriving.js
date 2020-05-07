const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    console.log(req.body[0]);
    pool.query(risql.function.check_if_rider_driving, [req.user.usr_id, req.body[0]],
        (q_err, q_res) => {
            console.log(q_res);
            if (q_err) {
                console.log(q_err);
                res.sendStatus(422);
            } else {
                res.sendStatus(200);
            }
        });
};