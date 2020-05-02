// allow the customer to add reviews for orders with a month

const pool = require('../../../db');
const sql = require('../../../sql');
const log = require('../../../logger');

module.exports=(req, res) => {
    pool.query(sql.customer.queries.get_pendingReview, [req.user.usr_id], (err, data)=> {
        if(err) {
            console.log(err)
            return res.send(err)
        }
        res.send(data.rows);
    })
}