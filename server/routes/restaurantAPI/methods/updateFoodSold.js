const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying update rMenuItem sold number.');
    const rid = req.params.rid;
    const fid = req.params.fid;
    const sold = req.body.amountSold;

    pool.query(rsql.update.dailySoldFoodItemCount, [rid, fid, sold],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr)
                res.status(500).send(qerr)
            } else {
                res.sendStatus(200)
            }
        })
};

