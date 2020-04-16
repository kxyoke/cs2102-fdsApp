const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
module.exports =  (req, res, next) => {

    const {food_id, res_id, qty} = req.body;
    console.log(food_id);
    console.log(res_id);
    console.log(qty);
    pool.query(sql.customer.function.add_cart, [req.user.usr_id, res_id, food_id, qty], err=> {
        if (err) {
            console.log(err.message)
            return res.send(err.message)
        } else {
            res.sendStatus(200);
        }
    })

   
};