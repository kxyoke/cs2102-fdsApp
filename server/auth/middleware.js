const log = require('../logger')
const pool = require('../db');
const sql = require('../sql');

exports.checkAuthenticated=(req, res, next)=> {
    log.info(JSON.stringify(req.user));
    log.info(`User authenticated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()) {
       return next()
    }
    res.status(401).send('Unauthorize!');
}

exports.checkNotAuthenticated=(req, res, next)=> {
    log.info(`User authenticated? ${req.isAuthenticated()}`)
    if(req.isAuthenticated()) {
        req.logout();

        // return res.sendStatus(401);
        // pool.query(sql.users.queries.find_customer_by_id, [req.user.usr_id], (err, data) => {
        //     if (err) {
        //         console.log("Cannot connect to the database");
        //         return res.send(500);
        //     } else if (data.rows.length === 1) {
        //         console.log("is customer");
        //         return res.send('customer');
        //     } else {
        //         pool.query(sql.users.queries.find_rider_by_id, [req.user.usr_id], (err, data) => {
        //             if (err) {
        //                 console.log( "Cannot connect to the database");
        //             } else if (data.rows.length === 1) {
        //                 console.log("is rider");
        //                 return res.status(401).send('deliveryRider');
        //             } else {
        //                 pool.query(sql.users.queries.find_res_staff_by_id, [req.user.usr_id], (err, data) => {
        //                     if (err) {
        //                        console.log("Cannot connect to the database");
        //                     } else if (data.rows.length === 1) {
        //                         console.log("is res");
        //                         return res.status(401).send('restaurant');
        //                     } else {
        //                         pool.query(sql.users.queries.find_fds_by_id, [req.user.usr_id], (err, data) => {
        //                             if (err) {
        //                                 console.log("Cannot connect to the database");
        //                             } else {
        //                                 console.log("is fds");
        //                                 return res.status(401).send('fdsManager');
        //                             }
        //                         })
        //                     }
        //                 })
        //             }
        //         })
                    
        //     }
        // })
            
    } 

    next();
}