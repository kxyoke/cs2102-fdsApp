const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const rsql = require('../../../sql/restaurant');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    log.info('Querying update rStaff user pwd.');
    const rid = req.params.rid;
    const oldPwd = req.body.oldPwd;
    const newPwd = req.body.newPwd;
    const hash = await bcrypt.hash(newPwd, 10);

    pool.query(rsql.get.allRDetails, [rid], (perr, pres) => {
        if (perr) {
            res.status(500).send(perr)
        } else {
            let storedHash = pres.rows[0].password_digest;
            bcrypt.compare(oldPwd, storedHash, (herr, isMatch) => {
                if (herr) {
                    res.status(500).send(herr)
                } else if (isMatch) {

                    pool.query(rsql.update.resPwd, [rid, hash],
                        (qerr, qres) => {
                            if (qerr) {
                                console.log(qerr);
                                res.status(500).send(qerr)
                            } else {
                                res.sendStatus(200);
                            }
                        })

                } else {
                    res.status(422).send('Passwords do not match.');
                }
            })
        }
    });

};

