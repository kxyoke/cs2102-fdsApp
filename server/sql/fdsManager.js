const fdsManager = {};

fdsManager.queries = {
    get_profile:
        'SELECT * FROM FdsManagers WHERE usr_id = $1',
    get_promos:
        'SELECT * FROM Promotions WHERE promotype = \'FDS\'',
    get_coupons:
        'SELECT * FROM CouponGroups',
    update_promo:
        'CALL updateManagerPromo($1, $2, $3, $4)', // pid, description, start_day, end_day
    update_coupon:
        'CALL updateCoupon($1, $2, $3)', //coupon_group_id, description, expiry_date
    add_promo:
        'CALL addManagerPromo($1, $2, $3, $4)', //pid, description, start_day, end_day
    add_coupon:
        'CALL addCoupon($1, $2, $3, $4, $5)' //coupon_group_id, description, expiry_date, target_customers, customer_activity
}

fdsManager.functions = {
    get_customer_summary:
        'SELECT * FROM customersOrderSummary($1)', //month
    get_general_summary:
        'SELECT * FROM generalSummary($1)', //month
    get_location_summary:
        'SELECT * FROM locationSummary($1)', //hour
    get_rider_summary:
        'SELECT * FROM riderSummary($1)' //month
}

module.exports = fdsManager;