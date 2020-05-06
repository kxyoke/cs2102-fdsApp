const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');

module.exports = (req, res) => {
    log.info('Queried get fdsManager profile.');
    const uid = req.user.usr_id;
    const username = req.user.username;

    pool.query(sql.fdsManager.queries.get_profile, [uid],
        (err, data) => {
            if (err) {
                throw err;
            }
            res.json({usr_id: uid, username: username});
        })
};