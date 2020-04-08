const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    pool.query(sql.customer.queries.get_profile, [req.user.usr_id], (err, data) => {
        if(err) {
            console.log("Database fail to get the data");
            return res.send(err);
        }
        res.send({usr_id: req.user.usr_id,
                    username: req.user.username,
                    cardnumber: data.rows[0].card_num,
                    rewardpoints: data.rows[0].reward_points})
    })
    res.send('Queried update profile');
};