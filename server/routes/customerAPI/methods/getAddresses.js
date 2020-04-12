const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_address, [req.user.usr_id], (err, data)=> {
        if(err) {
            console.log("Database fail to get the data");
            return res.send(err);
        }
        res.send(data.rows);
    })

};