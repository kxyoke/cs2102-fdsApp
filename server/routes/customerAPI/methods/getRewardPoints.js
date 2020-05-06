const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const log = require('../../../logger')

module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_reward_points, [req.user.usr_id], (err,data) => {
        if(err) {
            log.error(err)
            res.status(500).send("something went wrong")
        }
        else{
            res.send(data.rows);
        }
    })
    
};