const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    log.info('Querying update rStaff user pwd.');
    const uid = req.params.uid;
    const oldPwd = req.body.oldPwd;
    const newPwd = req.body.newPwd;
    const hash = await bcrypt.hash(newPwd, 10);

    pool.query(sql.users.queries.find_user_by_id, [uid], (perr, pres) => {
        if (perr) {
            res.status(500).send(perr)
        } else {
            let storedHash = pres.rows[0].password_digest;
            bcrypt.compare(oldPwd, storedHash, (herr, isMatch) => {
                if (herr) {
                    res.status(500).send(herr)
                } else if (isMatch) {

                    pool.query(sql.users.function.update_password, [uid, hash],
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

