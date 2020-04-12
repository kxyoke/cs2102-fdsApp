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
    var array = req.params.oid.split("&");
    var listofitems = array[1].split(",");
    console.log(listofitems);
    pool.query(risql.function.get_detailed_orders, [array[0], array[1]],
        (q_err, q_res) => {
            console.log(q_err);
            console.log(q_res);
    });

};