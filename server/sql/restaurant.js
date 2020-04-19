const queries = {};

queries.get = {
    rid: /*[staff_id]*/
        `SELECT usr_id as staff_id, res_id as rid FROM RestaurantStaffs WHERE usr_id = $1`,
    profile: /*[res_id]*/
        `SELECT * FROM Restaurants WHERE res_id = $1`,
    allMenuItems: /*[res_id]*/
        `SELECT * FROM MenuItems NATURAL JOIN FoodItems WHERE res_id = $1 ORDER BY name ASC, price DESC`,
    allFoodCategories:
        `SELECT category FROM FoodCategories ORDER BY category ASC`,
    rFoodCategories: /*[res_id]*/
        `SELECT DISTINCT category FROM FoodItems NATURAL JOIN MenuItems WHERE res_id = $1 ORDER BY category ASC`,
    foodItems: /*[[food_id]]*/
        `SELECT * FROM MenuItems NATURAL JOIN FoodItems WHERE food_id = ANY($1)`,
    allReviews: /*[res_id]*/
        `SELECT order_id, usr_id, listOfItems, food_rev, delivery_rating FROM Reviews NATURAL JOIN Orders WHERE res_id = $1 ORDER BY delivery_rating DESC`,
    allIncompleteOrders: /*[res_id]*/
        `SELECT order_id, O.usr_id as c_id, total, payment, listOfItems, status, is_prepared, D.usr_id as dr_id, place_order_time as order_time FROM Orders O JOIN Deliveries D using (order_id) WHERE res_id = $1 AND status <> 'complete' ORDER BY is_prepared DESC, order_time ASC`,
    allCompletedOrders: /*[res_id]*/
        `SELECT order_id, O.usr_id as c_id, total, payment, listOfItems, status, D.usr_id as dr_id, place_order_time, dr_leave_res as sent_food_time, dr_arrive_customer as complete_time FROM Orders WHERE res_id = $1 AND status = 'complete' ORDER BY complete_time DESC`,
    allPromos: /*[res_id]*/
        `SELECT * FROM PromotionsWithOrderStats WHERE res_id = $1 ORDER BY end_day ASC, start_day ASC`,
    allCurrentPromos: /*[res_id]*/
        `SELECT * FROM PromotionsWithOrderStats WHERE res_id = $1 AND end_day >= NOW() AND start_day <= NOW() ORDER BY start_day ASC, end_day ASC`,
    allFuturePromos:
        `SELECT * FROM PromotionsWithOrderStats WHERE res_id = $1 AND end_day > NOW() AND start_day > NOW() ORDER BY start_day ASC, end_day ASC`,
    allPastPromos:
        `SELECT * FROM PromotionsWithOrderStats WHERE res_id = $1 AND end_day < NOW() AND start_day < NOW() ORDER BY end_day DESC`
}

queries.update = {
    profile: `CALL updateRestaurantProfile($1, $2, $3, $4)`, /*res_id, rname, address, min_amt*/
    foodItem: `CALL updateRestaurantFoodItem($1, $2, $3, $4, $5, $6, $7)`, /*fid, price, dailyLmt, name, desc, imgpath, category*/
    foodItemCategory: `CALL updateCategoryOf($1, $2)`, /*fid, cat*/
    foodItemAvailability: `CALL updateAvailabilityOf($1, $2)`, /*fid, avail*/
    dailySoldFoodItemCount: `CALL incrementSoldFoodItem($1)`, /*fid*/
    resetDailySells: `CALL resetDailySellsForFoodItem($1)`, /*fid*/
    promo: `CALL updateRestaurantPromo($1, $2, $3, $4)` /*pid, desc, startDay, endDay*/
}

queries.add = {
    menuItem: `CALL addRestaurantMenuItem($1, $2, $3, $4, $5, $6, $7, $8)`, /*res_id, food_id, fname, fdesc, price, daily_limit, fimgPath, fcategory*/
    promo: `CALL addRestaurantPromo($1, $2, $3, $4, $5)` /*pid, rid, desc, startday, endday*/
}

queries.del = {
    foodItem: `CALL deleteFoodItem($1)` /*fid*/
}

module.exports = queries;

