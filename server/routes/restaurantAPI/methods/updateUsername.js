const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = async (req, res) => {
    log.info('Querying update rStaff username.');
    const uid = req.params.uid;
    const username = req.body.newName;

    pool.query(sql.users.function.update_username, [uid, username],
        (qerr, qres) => {
            if (qerr) {
                console.log(qerr);
                res.status(422).send(qerr)
            } else {
                res.sendStatus(200);
            }
        })

};

