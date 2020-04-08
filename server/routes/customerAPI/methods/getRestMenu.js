const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    console.log("get menu");
    console.log(req.body);
    console.log(req.params);
    pool.query(sql.customer.queries.get_menu, [req.params.rid])
        .then((data) => {
            console.log(data.rows);
            return res.send(data.rows);
            
        })
  
};