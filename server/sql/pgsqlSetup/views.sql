DROP VIEW IF EXISTS PromotionsWithOrderStats;
DROP VIEW IF EXISTS ResOrderProfits;

CREATE VIEW PromotionsWithOrderStats (pid, res_id, promotype, description, start_day, end_day, num_orders) AS (
    WITH OrdersUnderPromo (pid, order_id, order_time) AS (
        SELECT pid, order_id, place_order_time
        FROM Deliveries, Promotions
        WHERE place_order_time >= start_day
        AND place_order_time <= end_day
    ),
    NumOrdersUnderPromo (pid, num_orders) AS (
        SELECT pid, count(*)
        FROM OrdersUnderPromo
        GROUP BY pid
    )
    SELECT pid, res_id, promotype, description, start_day, end_day, coalesce(num_orders, 0)
    FROM Promotions LEFT JOIN NumOrdersUnderPromo using (pid)
);

CREATE VIEW ResOrderProfits (res_id, order_id, total, order_time, complete_time) AS (
    SELECT res_id, order_id, getCost(res_id, listOfItems, place_order_time), place_order_time, dr_arrive_cus
    FROM Orders JOIN Deliveries USING (order_id)
);

