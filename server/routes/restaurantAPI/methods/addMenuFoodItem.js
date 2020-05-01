const pool = require('../../../db'); // psql db
const log = require('../../../logger')
const rsql = require('../../../sql/restaurant');

const shortid = require('shortid');

module.exports = (req, res) => {
    log.info('Querying add rMenuItem.');
    const rid = req.params.rid;
    const fname = req.body.name;
    const fdesc = req.body.description;
    const price = req.body.price;
    const daily_lmt = req.body.daily_limit;
    const fimgPath = req.body.image_path;
    const fcat = req.body.category;

    const fid = shortid.generate(); // assume no collisions given low rate

    pool.query(rsql.add.menuItem, 
        [rid, fid, fname, fdesc, price, daily_lmt, fimgPath, fcat],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err)
                res.status(500).send(q_err)
            } else {
                res.sendStatus(200)
            }
        })
};

