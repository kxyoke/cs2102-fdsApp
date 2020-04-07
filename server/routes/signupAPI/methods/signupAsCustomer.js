const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

module.exports = async (req, res) => {
    console.log(req.body);
    var hash = await bcrypt.hash(req.body.password, 10);
    const id = shortid.generate();
    pool.query(sql.users.function.addCustomer, [id,req.body.username,hash], (err)=> {
        if(err) {
            console.log(err.message);
            if(err.message === 'username in used') {
                return res.status(422).send(err.message);
            } else if (err.message === 'usr_id in used') {
                //do something
            } else {
                console.log('database err found')
                return res.sendStatus(500);
            }
        } else {
            res.sendStatus(200);
        }
    });
    // pool.query(sql.users.queries.find_user_by_username,[req.body.username], (err, data) => {
    //     if(err) {
    //         console.log("Cannot connect to the database")
    //         return res.send(err);
    //     }
    //     if(data.rows.length === 1) {
    //         console.log("username in used");
    //         return res.sendStatus(422);
    //     }
    //     if(data.rows.length === 0) {
    //         console.log("username not in used");
    //         bcrypt.hash(req.body.password, 10, (err, hash) => {
    //             console.log(hash);
    //         })
    //         return res.sendStatus(200);

    //     }

    // })
/*
    pool.query('SELECT * FROM Restaurants',
        (q_err, q_res) => {
            res.json(q_res.rows)
        });
//https://www.freecodecamp.org/news/fullstack-react-blog-app-with-express-and-psql/
*/
    // res.send('Queried customer signup.');
};

