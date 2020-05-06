const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const log = require('../../../logger');

module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_res_current_promos, [req.params.res_id], (err,data)=> {
        if(err) {
            log.err(err)
            return res.status(500).send("something wrong with the server");
        } 
        res.send(data.rows);
    })

};