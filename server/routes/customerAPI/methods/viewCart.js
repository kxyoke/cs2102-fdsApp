const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const fc = require('../function');

module.exports = async (req, res,next) => {
    const data = await pool.query(sql.customer.queries.get_cart, [req.user.usr_id]);
    if(data.rows.length === 0) {
        return res.send('empty');
    } else {
        console.log(data.rows);
    }

   
    // fc.foodItemConvert(data.rows);
    // res.send(data.rows[0].fooditems);
    // res.send({{"1":10}, {"20": 20}})
    res.status(200).send(data.rows);
};