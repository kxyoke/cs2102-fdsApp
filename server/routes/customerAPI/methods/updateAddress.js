const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {
    const{oldAddress, newAddress} = req.body
    console.log(oldAddress)
    console.log(newAddress);
    pool.query(sql.customer.function.update_address, [req.user.usr_id, oldAddress, newAddress], err=> {
        if(err) {
            if(err.code === '23505') {
                return res.status(409).send("You have already register this address previously. Update is unsuccessful!");
            }
        } else {
            res.sendStatus(200);
        }
    })
   
};