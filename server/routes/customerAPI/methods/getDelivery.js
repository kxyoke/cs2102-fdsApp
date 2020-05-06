const pool = require('../../../db'); // psql db
const sql = require('../../../sql')
const log = require('../../../logger')
module.exports = (req, res,next) => {

    console.log(req.params);
    pool.query(sql.customer.queries.get_delivery_detail, [req.params.order_id], (err, data)=> {
        if(err) {
            log.error(err)
            res.status(500).send("something wrong the server")
        } else {
            res.send(data.rows[0]);
        }
    })
    
};