const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

module.exports =async (req, res) => {
    console.log(req.body);
    var hash = await bcrypt.hash(req.body.password, 10);
    const id = shortid.generate();
    if (req.body.riderType === 'full') {
        console.log(id, hash, req.body.username);
        console.log('fulltime')
        pool.query(sql.users.function.addFullTimeRider,
            [id, req.body.username, hash],
            (err) => {
                if (err) {
                    console.log(err.message);
                    if (err.message === 'username in used') {
                        return res.status(422).send(err.message);
                    } else if (err.message === 'usr_id in used') {
                        //do something
                    } else {
                        console.log('database err found')
                        return res.sendStatus(500);
                    }
                } else {
                    return res.sendStatus(200);
                }
            })
    } else {
        console.log(id, hash, req.body.username);
        console.log('parttime')
        pool.query(sql.users.function.addPartTimeRider,
            [id, req.body.username, hash],
            (err) => {
                if(err) {
                    console.log(err.message);
                    if(err.message === 'username in used') {
                        return res.status(422).send(err.message);
                    }  else if (err.message === 'usr_id in used') {
                        //do something
                    } else {
                        console.log('database err found')
                        return res.sendStatus(500);
                    }
                } else {
                    return res.sendStatus(200);
                }
            })

    }
};