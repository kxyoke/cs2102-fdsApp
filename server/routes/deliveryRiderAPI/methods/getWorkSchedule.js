const pool = require('../../../db'); // psql db

module.exports = (req, res) => {
    pool.query('SELECT * FROM Mws  WHERE usr_id = $1 ', [req.user.usr_id],
        (q_err, q_res) => {
            res.status(200).json(q_res.rows)
        });
};