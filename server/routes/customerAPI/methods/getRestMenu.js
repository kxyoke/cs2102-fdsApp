const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res, next) => {
    console.log("get menu");
    pool.query(sql.customer.queries.get_menu, [req.params.rid])
        .then((data) => {
            return res.send(data.rows);
            
        })
  
};