const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res,next) => {
    //the qty will be the new qty of the cartitem fetched from the client side
    //A trigger is used to check the entries in the cartitem's qty after update or add new
    //if the qty of the cartitem is 0 trigger will delete the entity from the database
    console.log(req.body)
    pool.query(sql.customer.queries.update_cart, [req.user.usr_id, req.body.food_id,req.body.qty], (err)=> {
        if(err) {
            console.log(err);

        }
        res.sendStatus(200);
    })
};