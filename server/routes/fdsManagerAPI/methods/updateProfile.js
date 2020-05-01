const pool = require('../../../db'); // psql db
const log = require('../../../logger');
const sql = require('../../../sql');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const { isUsername, username, password, passwordConfirmation } = req.body;
    const uid = req.user.usr_id;
    var errorMessage = "default error message";

    if (isUsername) {
        log.info('Queried update fdsManager username.');

        if (username == null || username == '') {
            errorMessage = "Please enter a new username."
        }

        pool.query(sql.users.function.update_username, [uid, username],
            (err, data) => {
            if (err) {
                return res.status(409).send(errorMessage);
            } else {
                res.json(data.rows);
            }
        })
    } else {
        log.info('Queried update fdsManager password.');
        var hash = null;

        if (password == null || password == '') {
            errorMessage = "Please enter a new password."
        } else if (passwordConfirmation == null || passwordConfirmation == '') {
            errorMessage = "Please confirm your new password."
        } else if (password !== passwordConfirmation) {
            errorMessage = "Passwords do not match."
        } else {
            var hash = await bcrypt.hash(password, 10);
        }

        pool.query(sql.users.function.update_password, [uid, hash],
            (err, data) => {
                if (err || password !== passwordConfirmation) {
                    return res.status(409).send(errorMessage);
                }
                res.json(data.rows);
            })
    }
};