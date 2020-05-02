const sql = {};

sql.users = require('./users.js');
sql.rQueries = require('./restaurant.js');
sql.customer = require('./customer');
sql.fdsManager = require('./fdsManager');

module.exports = sql;

