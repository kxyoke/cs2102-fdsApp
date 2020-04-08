const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports =  (req, res,next) => {
    pool.query(sql.customer.queries.get_orders, [req.param.usr_id])
    .then(data=>
    console.log(data))
    res.send('Queried for viewing past orders');
};