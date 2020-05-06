const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    pool.query(sql.customer.queries.get_review, [req.user.usr_id], (err, data)=> {
        if(err) {
            console.log("DATABASE error");
            res.sendStatus(500);
        } else {
            console.log(data.rows);
            res.send(data.rows);
        }
    })
    
};