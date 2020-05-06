const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying stats total cost of orders.');
    const rid = req.params.rid;
    const start = req.params.startDate;
    const end = req.params.endDate;
    
    pool.query(rsql.stats.totalCostOrders, [rid, start, end],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr);
                res.status(500).send(qerr)
            } else {
                res.json(qres.rows)
            }
        })
};

