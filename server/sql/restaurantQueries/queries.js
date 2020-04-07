const queries = {};

queries.get = {
    profile: ``,
    allMenuItems: ``,
    foodItem: `SELECT * FROM MenuItems NATURAL JOIN FoodItems WHERE food_id = $1 AND res_id = $2`,
    allReviews: ``,
    allOrders: ``,
    allPromos: ``
}

queries.update = {
    profile: `CALL updateRestaurantProfile($1, $2, $3, $4)`, /*res_id, rname, address, min_amt*/
    foodItem: ``,
    promo: ``
}

queries.add = {
    menuItem: `CALL addRestaurantMenuItem($1, $2, $3, $4, $5, $6, $7)`, /*res_id, food_id, price, dailyLmt, fname, fdesc, fimgPath*/
    promo: `CALL addRestaurantPromo($1, $2, $3, $4, $5)` /*pid, rid, desc, startday, endday*/
}

queries.del = {
    foodItem: ``
}

module.exports = queries;

