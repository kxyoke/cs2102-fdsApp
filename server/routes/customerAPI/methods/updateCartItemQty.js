const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {

    console.log(req.body)
    pool.query(sql.customer.queries.update_cart, [req.user.usr_id, req.body.food_id,req.body.qty], (err)=> {
        if(err) {
            console.log(err);

        }
        res.sendStatus(200);
    })
};