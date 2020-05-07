const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const log = require('../../../logger');

module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_all_current_promos, [], (err, data)=> {
        if(err) {
            log.error(err)
            return res.status(500).send("something wrong with the server");
        } 
        res.send(data.rows);
    })

};
