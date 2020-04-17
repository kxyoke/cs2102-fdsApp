const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
module.exports =  (req, res, next) => {
    //trigger is used to check the data
    //if the food_id is already in the cart
    //trigger will update the cart and drop the new entity
    
    const {food_id, res_id, qty} = req.body;
    pool.query(sql.customer.function.add_cart, [req.user.usr_id, res_id, food_id, qty], err=> {
        if (err) {
            console.log(err.message)
            return res.send(err.message)
        } else {
            res.sendStatus(200);
        }
    })

   
};