DROP VIEW IF EXISTS PromotionsWithOrderStats;

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

