const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const log = require("../../../logger");

module.exports = (req, res,next) => {
    pool.query(sql.customer.queries.get_res, (err, data) => {
        if(err) {
            log.error("Fail to get data from database");
            return res.sendStatus(500);
        }
        if(data.rows.length === 0) {
            return res.send("no restaurants");
        }
        log.info(data.rows);
        return res.send(data.rows);
    })
};