const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const fc = require('../utils');

module.exports = async (req, res,next) => {
    var out = [];
    try{

        const data = await pool.query(sql.customer.queries.get_order_not_complete, [req.user.usr_id]);
           
        for (const d of data.rows) {
            const x = await fc.foodItemConvert(d);
            // console.log(x);
            const output = {
                order_id:d.order_id,
                res_id:d.res_id,
                rname:d.rname,
                listofitems:x,
                total: d.total,
                payment: d.payment,
                status: d.status,
                is_prepared:d.is_prepared,
                ordertime: d.ordertime
            }
            out.push(output);
        }
                  
        } catch (err) {
            console.log(err);
            return res.status(500).send('Something went wrong');
        }

        res.send(out);
    
};