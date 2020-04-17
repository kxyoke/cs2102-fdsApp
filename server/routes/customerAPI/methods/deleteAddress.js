const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    pool.query(sql.customer.function.delete_address, [req.user.usr_id, req.body.address],err=> {
        if(err) {
            console.log(err)
        } else {
            res.send("Address deleted");
        }
    })
  
};