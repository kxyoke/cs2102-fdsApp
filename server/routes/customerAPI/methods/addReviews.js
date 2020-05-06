const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    console.log(req.body);
    const {order_id, food_rev, delivery_rating } = req.body;
    pool.query(sql.customer.function.add_review, [order_id, food_rev, delivery_rating], (err)=> {
        if(err) {
            console.log("DATABASE error");
            res.sendStatus(500);
        } else {
            res.send("You have make a review!");
        }
    })
    
    
};