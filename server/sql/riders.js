const riders = {}

riders.queries = {
    find_schedule_by_username: 'SELECT * FROM Mws NATURAL JOIN Shifts WHERE usr_id = $1',
    get_recent_deliveries: 'SELECT * FROM Deliveries WHERE rusr_id = $1',
    get_available_orders: 'SELECT * FROM Orders NATURAL JOIN Restaurants NATURAL JOIN Deliveries WHERE Orders.status = $1'
}

riders.function = {
    edit_schedule_by_username: 'CALL editFRiderSchedule($1,$2)',
    get_detailed_orders: 'SELECT getDetailedOrders($1,$2)'
}


module.exports = riders;