const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');

module.exports = async (req, res, next) => {

    if (req.body.username) {
        console.log("update username");

        pool.query(sql.users.function.update_username, [req.user.usr_id, req.body.username], err => {
            if (err) {
                console.log(err.message);
                return res.status(443).send(err.message);
            } else {
                res.send("Username changed");
            }
        })
    } else if (req.body.password) {
        console.log("update password");
        var hash = await bcrypt.hash(req.body.password, 10);
        pool.query(sql.users.function.update_password, [req.user.usr_id, hash], (err) => {
            if (err) {
                console.log(err.message);
                return req.status(443).send(err.message);
            } else {
                res.send("Password changed");
            }
        })
    }
}