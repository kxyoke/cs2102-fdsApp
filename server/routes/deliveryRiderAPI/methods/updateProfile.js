const pool = require('../../../db'); // psql db

module.exports = (req, res) => {
/*
    pool.query('SELECT * FROM Restaurants',
        (q_err, q_res) => {
            res.json(q_res.rows)
        });
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/
    res.send('Queried update riderProfile.');
};