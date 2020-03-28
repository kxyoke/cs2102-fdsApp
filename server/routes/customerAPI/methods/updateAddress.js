const pool = require('../../../db'); // psql db

module.exports = (req, res,next) => {
/*
    pool.query('SELECT * FROM Restaurants',
        (q_err, q_res) => {
            res.json(q_res.rows)
        });

*/
    res.send('Queried  update address for customers');
};