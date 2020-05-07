const queries = {};

queries.get = {
    allRestaurants:
        `SELECT res_id, rname, address, min_amount 
         FROM Restaurants 
         ORDER BY rname ASC`,
    userInfo: /*[staff_id]*/
        `SELECT usr_id as staff_id, res_id as rid, is_manager 
         FROM RestaurantStaffs 
         WHERE usr_id = $1`,
    allRDetails: /*[res_id}*/
        `SELECT * FROM Restaurants 
         WHERE res_id = $1`,
    profile: /*[res_id]*/
        `SELECT res_id, rname, address, postal_code, min_amount FROM Restaurants 
         WHERE res_id = $1`,
    allMenuItems: /*[res_id]*/
        `SELECT res_id, food_id, name, description, imagepath, category, 
                price, daily_limit, available, current_date as day, COALESCE(num_sold, 0) as daily_sells 
         FROM MenuItems NATURAL LEFT JOIN 
            (SELECT * FROM MenuItemsSold WHERE res_id = $1 AND day = current_date) as M 
         WHERE res_id = $1 
         ORDER BY name ASC, price DESC`,
    allFoodCategories:
        `SELECT category FROM FoodCategories 
         ORDER BY category ASC`,
    rFoodCategories: /*[res_id]*/
        `SELECT DISTINCT category FROM MenuItems 
         WHERE res_id = $1 
         ORDER BY category ASC`,
    foodItems: /*res_id, [[food_id]]*/
        `SELECT * FROM MenuItems 
         WHERE res_id = $1 AND food_id = ANY($2)`,
    allReviews: /*[res_id]*/
        `SELECT order_id, usr_id, listOfItems, food_rev, delivery_rating 
         FROM Reviews NATURAL JOIN Orders 
         WHERE res_id = $1 
         ORDER BY delivery_rating DESC`,
    allIncompleteOrders: /*[res_id]*/
        `SELECT order_id, res_id, O.usr_id as c_id, total, payment, listofitems, 
                status, is_prepared, D.usr_id as dr_id, place_order_time as order_time 
         FROM Orders O JOIN Deliveries D using (order_id) 
         WHERE res_id = $1 AND status <> 'complete' 
         ORDER BY is_prepared ASC, order_time ASC`,
    allCompletedOrders: /*[res_id]*/
        `SELECT order_id, res_id, O.usr_id as c_id, total, payment, listOfItems,
                status, is_prepared, D.usr_id as dr_id, place_order_time as order_time, 
                dr_leave_res as sent_food_time, dr_arrive_cus as complete_time 
         FROM Orders O JOIN Deliveries D using (order_id)
         WHERE res_id = $1 AND status = 'complete' 
         ORDER BY complete_time DESC`,
    allPromos: /*[res_id]*/
        `SELECT * FROM PromotionsWithOrderStats 
         WHERE res_id = $1 
         ORDER BY end_day ASC, start_day ASC`,
    allCurrentPromos: /*[res_id]*/
        `SELECT * FROM PromotionsWithOrderStats 
         WHERE res_id = $1 AND end_day >= NOW() AND start_day <= NOW() 
         ORDER BY start_day ASC, end_day ASC`,
    allFuturePromos:
        `SELECT * FROM PromotionsWithOrderStats 
         WHERE res_id = $1 AND end_day > NOW() AND start_day > NOW() 
         ORDER BY start_day ASC, end_day ASC`,
    allPastPromos:
        `SELECT * FROM PromotionsWithOrderStats 
         WHERE res_id = $1 AND end_day < NOW() AND start_day < NOW() 
         ORDER BY end_day DESC`
}

queries.stats = { //excl promos ^
    numOrdersCompleted: /*res_id, startdate, enddate*/
        `SELECT count(*) as total 
         FROM Orders O JOIN Deliveries D USING (order_id) 
         WHERE res_id = $1 
           AND COALESCE(dr_arrive_cus >= $2, FALSE) 
           AND COALESCE(dr_arrive_cus <= $3, FALSE)`,
    totalCostOrders: /*res_id, startdate, enddate*/
        `SELECT COALESCE(sum(total), 0) as total 
         FROM ResOrderProfits 
         WHERE res_id = $1 
           AND COALESCE(complete_time >= $2, FALSE) 
           AND COALESCE(complete_time <= $3, FALSE)`,
    top5Favs: /*res_id, startdate, enddate*/
        `WITH MenuItemOrders AS (
            SELECT res_id, food_id, name, description, imagepath, category,
                   price, daily_limit, 
                   getFoodNumOrders(res_id, food_id, $2, $3) as numOrders
            FROM MenuItems
            WHERE res_id = $1
         )
         SELECT * FROM MenuItemOrders
         ORDER BY numOrders DESC, name ASC
         LIMIT 5`,

}

queries.update = {
    profile: `CALL updateRestaurantProfile($1, $2, $3, $4, $5)`, /*res_id, rname, address, min_amt*/
    resPwd: `UPDATE Restaurants SET password_digest = $2 WHERE res_id = $1`, /*res_id, pwdHash*/
    foodItem: `CALL updateRestaurantFoodItem($1, $2, $3, $4, $5, $6, $7, $8)`, /*rid, fid, price, dailyLmt, name, desc, imgpath, category*/
    foodItemCategory: `CALL updateCategoryOf($1, $2, $3)`, /*rid, fid, cat*/
    foodItemAvailability: `CALL updateAvailabilityOf($1, $2, $3)`, /*rid, fid, avail*/
    dailySoldFoodItemCount: `CALL incrementSoldFoodItem($1, $2, $3)`, /*rid, fid, amtToIncrement*/
    promo: `CALL updateRestaurantPromo($1, $2, $3, $4)`, /*pid, desc, startDay, endDay*/
    orderIsPrepared: `UPDATE Orders SET is_prepared = TRUE WHERE order_id = $1`, /*oid*/

}

queries.add = {
    menuItem: `CALL addRestaurantMenuItem($1, $2, $3, $4, $5, $6, $7, $8)`, /*res_id, food_id, fname, fdesc, price, daily_limit, fimgPath, fcategory*/
    promo: `CALL addRestaurantPromo($1, $2, $3, $4, $5)` /*pid, rid, desc, startday, endday*/
}

queries.del = {
    foodItem: `CALL deleteFoodItem($1, $2)` /*rid,fid*/
}

module.exports = queries;

