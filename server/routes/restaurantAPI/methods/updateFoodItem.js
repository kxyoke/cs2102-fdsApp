const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');

module.exports = (req, res) => {
    log.info('Querying update rMenuItem.');
    const rid = req.params.rid;
    const fid = req.params.fid;
    const price = req.body.price;
    const dailyLmt = req.body.daily_limit;
    const name = req.body.name;
    const desc = req.body.description;
    const imgPath = req.body.image_path;
    const cat = req.body.category;

    pool.query(rsql.update.foodItem,
        [rid, fid, price, dailyLmt, name, desc, imgPath, cat],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr)
                res.status(500).send(qerr)
            } else {
                res.send(qres)
            }
        })
};

