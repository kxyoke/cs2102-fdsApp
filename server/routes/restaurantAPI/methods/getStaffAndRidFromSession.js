const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Retrieving session staff id and rid...');
    const staffid = req.user.usr_id;
    log.info('user id was ' + staffid);
    
    pool.query(rsql.get.rid, [staffid],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr);
                res.status(500).send(qerr)
            } else {
                res.json(qres.rows)
            }
        })
};

