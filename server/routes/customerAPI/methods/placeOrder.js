const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const fc = require('../utils');
const shortid = require('shortid');
const log = require('../../../logger');
module.exports = async (req, res,next) => {
    try {
        const {totalcost, payment, address, deliveryFee, coupon} = req.body;
        
        console.log(coupon);
        const order_id = shortid.generate();
        const cart_items= await pool.query(sql.customer.queries.get_cart_for_backend, [req.user.usr_id]);
     
        const res_id = cart_items.rows[0].res_id;
        const listOfItems= fc.convertCartItemToListOfItem(cart_items.rows);
        if(coupon !== null) {
            await pool.query(sql.customer.function.use_coupon, [coupon]);
        }
        await pool.query(sql.customer.function.place_order,
                     [
                        order_id,
                        req.user.usr_id,
                        res_id,
                        totalcost,
                        address,
                        payment,
                        listOfItems,
                        deliveryFee
                        ], err=> {
                            if(err) {
                                log.error(err)
                                res.status(500).send('something when wrong')
                            } else {
                                res.send('Your order is place, please wait patiently for the food.....');
                            }
                        })
    } catch (e) {
        log.error(e)
    }


};