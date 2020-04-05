
const pool = require( '../db');
const sql = require('../sql');

exports.isFDS=(req, res, next)=> {
    pool.query(sql.users.queries.find_fds_by_id, [req.user.usr_id], (err, data) => {
        if(data.rows.length === 1) {
            console.log("is FDS");
            return next();
        }
        req.logout();
        res.status(401).send('No access to the FDSmanager page');
    })

}

exports.isCustomer=(req, res, next)=> {
    pool.query(sql.users.queries.find_customer_by_id, [req.user.usr_id], (err, data) => {
        if(data.rows.length === 1) {
            console.log("is customer")
            return next();
        }
        req.logout();
        res.status(401).send('No access to the customer page');
    })
}
exports.isResStaff=(req, res, next)=> {
    pool.query(sql.users.queries.find_res_staff_by_id, [req.user.usr_id], (err, data) => {
        if(data.rows.length === 1) {
            console.log("is restaurant staff")
            return next();
        }
        req.logout();
        res.status(401).send('No access to the restaurant staff page');
    })
}
exports.isRider=(req, res, next)=> {
    pool.query(sql.users.queries.find_rider_by_id, [req.user.usr_id], (err, data) => {
        if(data.rows.length === 1) {
            console.log("is rider");
            
            return next();
        }
        req.logout();
        res.status(401).send('No access to the rider page');
    })
}