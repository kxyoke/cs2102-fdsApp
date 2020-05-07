const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const fc = require('../utils');
const shortid = require('shortid');
const log = require('../../../logger');
module.exports = async (req, res,next) => {
    const {totalcost, payment, address, deliveryFee, coupon, rp_used} = req.body;
    
    console.log(coupon);
    const order_id = shortid.generate();
    const cart_items= await pool.query(sql.customer.queries.get_cart_for_backend, [req.user.usr_id]);
    console.log(req.body)
    const res_id = cart_items.rows[0].res_id;
    const listOfItems= fc.convertCartItemToListOfItem(cart_items.rows);
    
    pool.query(sql.customer.function.place_order,
                 [
                    order_id,
                    req.user.usr_id,
                    res_id,
                    totalcost,
                    address,
                    payment,
                    listOfItems,
                    deliveryFee,
                    rp_used
                    ], 
        (qerr,qres) => {
            if(qerr) {
                log.error(qerr)
                res.status(422).send(qerr.message)
            } else {
                if(coupon !== '') {
                    pool.query(sql.customer.function.use_coupon, [coupon],
                        (q2err) => {console.log(q2err);});
                }

                res.send('Your order is place, please wait patiently for the food.....');
            }
        })

};
