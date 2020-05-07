const pool = require('../../../db'); // psql db
const risql = require('../../../sql/riders');

module.exports = (req, res) => {
    /*
        pool.query('SELECT * FROM Restaurants',
            (q_err, q_res) => {
                res.json(q_res.rows)
            });
    //https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
    */
    pool.query(risql.function.get_filtered_working_hours, [req.user.usr_id, req.query.filter],
        (q_err, q_res) => {
            if (q_err) {
                console.log(q_err);
                res.sendStatus(422);
            } else {
                console.log(q_res.rows);
                res.json(q_res.rows);
            }
        });
};