const riders = {}

riders.queries = {
    find_schedule_by_username: 'SELECT * FROM Mws NATURAL JOIN Shifts WHERE usr_id = $1',
    get_part_time_schedule: 'SELECT * FROM Wws WHERE usr_id = $1',
    get_recent_deliveries: 'SELECT Orders.usr_id, Orders.order_id, Orders.res_id, Orders.total, Orders.destination_address, Orders.postal_code AS Opc, Deliveries.place_order_time,  Deliveries.dr_leave_for_res, Deliveries.dr_arrive_res, Deliveries.dr_leave_res, Deliveries.dr_arrive_cus, Restaurants.address,Restaurants.rname, Restaurants.postal_code AS RPC FROM Orders INNER JOIN Restaurants ON Restaurants.res_id = Orders.res_id INNER JOIN Deliveries ON Deliveries.order_id = Orders.order_id WHERE Deliveries.usr_id = $1 AND Orders.status = $2 ORDER BY Deliveries.place_order_time DESC',
    get_available_orders: 'SELECT Orders.order_id, Orders.res_id, Orders.total, Orders.destination_address, Orders.postal_code AS Opc, Deliveries.place_order_time, Restaurants.address,Restaurants.rname, Restaurants.postal_code AS RPC FROM Orders INNER JOIN Restaurants ON Restaurants.res_id = Orders.res_id INNER JOIN Deliveries ON Deliveries.order_id = Orders.order_id WHERE Orders.status = $1  ORDER BY Deliveries.place_order_time DESC',
    get_foodName:"SELECT name FROM foodItems WHERE food_id = $1",
    get_detailed_orders: "SELECT * from Orders WHERE order_id = $1 ",
    get_current_deliveries: "SELECT Orders.usr_id, Orders.order_id, Orders.status, Orders.res_id, Orders.total, Orders.destination_address, Orders.postal_code AS Opc, Deliveries.place_order_time, Deliveries.dr_leave_for_res, Deliveries.dr_arrive_res, Deliveries.dr_leave_res, Deliveries.dr_arrive_cus, Restaurants.address,Restaurants.rname, Restaurants.postal_code AS RPC FROM Orders INNER JOIN Restaurants ON Restaurants.res_id = Orders.res_id INNER JOIN Deliveries ON Deliveries.order_id = Orders.order_id WHERE Orders.status = $2 AND Deliveries.usr_id = $1",
    get_full_time_rider: "SELECT * FROM Fulltimerider Where usr_id = $1",
    get_profile: "SELECT userName FROM Users WHERE usr_id = $1"
}

riders.function = {
    edit_schedule_by_username: 'CALL editFRiderSchedule($1,$2)',
    edit_PTschedule_by_username: 'CALL editPTRiderSchedule($1,$2,$3)',
    check_if_rider_driving: 'CALL checkIfRiderDriving($1,$2)',
    update_delivery_time: 'CALL updateDeliveryTime($1,$2)',
    get_rider_base_salary: "SELECT getRiderSalary($1, $2)",
    get_filtered_deliveries: 'SELECT getFilteredDeliveries($1, $2)',
    get_filtered_working_hours: 'SELECT getFilteredWorkingHours($1,$2)',
    get_current_schedule: 'SELECT getCurrentSchedule($1)'
}


module.exports = riders;