const pool = require('../../../db'); // psql db
const sql = require('../../../sql');

module.exports = (req, res) => {
    console.log("get menu");
    pool.query(sql.rQueries.get.allMenuItems, [req.params.rid])
        .then((data) => {
            return res.send(data.rows);
            
        })
  
};
