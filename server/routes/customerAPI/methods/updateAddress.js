const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {
    const{oldAddress, newAddress, newPostal} = req.body
    console.log(oldAddress);
    
    if(oldAddress !== null) {
        pool.query(sql.customer.function.update_address, [req.user.usr_id, oldAddress, newAddress, newPostal], err=> {
            if(err) {
                if(err.code === '23505') {
                    return res.status(409).send("You have already register this address previously. Update is unsuccessful!");
                }
            } else {
                res.sendStatus(200);
            }
        })
    } else {
        pool.query(sql.customer.function.add_address, [req.user.usr_id, newAddress, newPostal], err=> {
            if(err) {
                console.log(err);
                if(err.code ==='23505') {
                    return res.status(409).send("You have already register this address previously!");
                } else {
                    return res.status(500).send("something wrong with the server");
                }
            }else {
                res.sendStatus(200);
            }
        })
    }
    
};