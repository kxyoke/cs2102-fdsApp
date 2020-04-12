const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const fc = require('../function');

module.exports = async (req, res,next) => {
    var data = await pool.query(sql.customer.queries.get_cart, [req.user.usr_id]);
    if(data.rows.length === 0) {
        await pool.query(sql.customer.function.add_cart, [req.user.usr_id]);
    }
    data = await pool.query(sql.customer.queries.get_cart, [req.user.usr_id]);
    console.log(data.rows);
    // fc.foodItemConvert(data.rows);
    // res.send(data.rows[0].fooditems);
    // res.send({{"1":10}, {"20": 20}})
    res.send(data.rows);
};