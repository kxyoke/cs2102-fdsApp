const pool = require('../../../db'); // psql db
const sql = require('../../../sql');


module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_order_not_complete, [req.user.usr_id], (err, data)=> {
        if(err) {
            console.log(err);
            res.status(500).send('Something went wrong');
        } else {
            if(data.rows.length>0) {
                const msg = 'You currently have '+ data.rows.length + ' orders in process';
                res.send(msg);
            } else {
                res.send('OK');
            }
        }
    })
};