const riders = {}

riders.queries = {
    find_schedule_by_username: 'SELECT * FROM Mws NATURAL JOIN Shifts WHERE usr_id = $1',
    get_recent_deliveries: 'SELECT * FROM Deliveries WHERE usr_id = $1'
}

riders.function = {
    edit_schedule_by_username: 'CALL editFRiderSchedule($1,$2)'
}


module.exports = riders;