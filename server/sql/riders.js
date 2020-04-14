const riders = {}

riders.queries = {
    find_schedule_by_username: 'SELECT * FROM Mws NATURAL JOIN Shifts WHERE usr_id = $1',
    get_recent_deliveries: 'SELECT * FROM Deliveries NATURAL JOIN Orders NATURAL JOIN Restaurants WHERE rusr_id = $1 ORDER BY Deliveries.place_order_time DESC',
    get_available_orders: 'SELECT * FROM Orders NATURAL JOIN Restaurants NATURAL JOIN Deliveries WHERE Orders.status = $1  ORDER BY Deliveries.place_order_time DESC',
    get_foodName:"SELECT name FROM foodItems WHERE food_id = $1",
    get_detailed_orders: "SELECT * from Orders WHERE order_id = $1 ",
    get_current_deliveries: "SELECT * FROM Orders NATURAL JOIN Restaurants NATURAL JOIN Deliveries WHERE Orders.status = $2 AND Deliveries.rusr_id = $1"
}

riders.function = {
    edit_schedule_by_username: 'CALL editFRiderSchedule($1,$2)',
    check_if_rider_driving: 'CALL checkIfRiderDriving($1,$2)',
    update_delivery_time: 'CALL updateDeliveryTime($1,$2)'
}


module.exports = riders;