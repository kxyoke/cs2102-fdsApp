const pool = require('../../../db'); // psql db
const sql = require('../../../sql');
const bcrypt = require('bcrypt');
const shortid = require('shortid');

module.exports = async (req, res) => {
    console.log(req.body);
    var hash = await bcrypt.hash(req.body.password, 10);
    const id = shortid.generate();
    const username = req.body.username;
    var res_id = req.body.res_id;
    const isNewRes = req.body.isNewRes;
    const resPwd = await bcrypt.hash(req.body.resPassword, 10);
    if (isNewRes) {
        res_id = shortid.generate();
        const min_amt = req.body.min_amt;
        const resName = req.body.resName;
        const resAddress = req.body.resAddress;
        const resPostal = req.body.resPostal;
        pool.query(sql.users.function.addRestaurantStaffAndRes, 
            [res_id, id, username, hash, resName, resAddress, resPostal, min_amt, resPwd], 
            (err) => {
            if(err) {
                if(err.message === 'username in used') {
                    return res.status(422).send(err.message);
                } else if (err.message === 'usr_id in used') {
                    //do something
                } else {
                    console.log('database err found')
                    console.log(err)
                    return res.status(423).send(err.message);
                }
            } else {
                return res.sendStatus(200);
            }
                
            
        })
    } else {
      pool.query(sql.users.queries.get_res_pwd, [res_id], (qerr, qres) => {
        console.log("trying get rpw")
        if (qerr) {
            throw qerr;
        }
        let hashedResPwd = qres.rows[0].password_digest; 
        bcrypt.compare(req.body.resPassword, hashedResPwd,
            (herr, isLegal) => {
                if (herr) {
                    throw herr;
                }

                if (isLegal) {
                  pool.query(sql.users.function.addRestaurantStaffOnly,
                    [res_id, id, username, hash],
                    (err) => {
                      if (err) {
                        if(err.message === 'username in used') {
                            return res.status(422).send(err.message);
                        } else if (err.message === 'usr_id in used') {
                            //do something
                        } else {
                            console.log('database err found')
                            console.log(err)
                            return res.status(423).send(err.message);
                        }
                      } else {
                            res.sendStatus(200);
                      }
                    })
                } else {
                    res.status(421).send('Restaurant passwords do not match!')
                }
            })
      })
    }
};

