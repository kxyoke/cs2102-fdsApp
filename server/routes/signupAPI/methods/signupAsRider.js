const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');
const shortid = require('shortid');
const log = require('../../../logger');

module.exports =async (req, res) => {
    console.log(req.body);
    var hash = await bcrypt.hash(req.body.password, 10);
    const id = shortid.generate();

    switch (req.body.riderType) {
        case 'full':
            pool.query(sql.users.function.addFullTimeRider, 
                    [id, req.body.username, hash],
                     (err) => {
                    if(err) {
                        log.error(err.message);
                        if(err.message === 'username in used') {
                            return res.status(422).send(err.message);
                        }  else if (err.message === 'usr_id in used') {
                            //do something
                        } else {
                            log.error('database err found')
                            return res.sendStatus(500);
                        }

                    } else {
                    return res.sendStatus(200);
                }
                })
                    break;
        case 'part':

               
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
        break;

    }
};
