DROP FUNCTION IF EXISTS inactiveCustomers(last_active timestamp);
DROP FUNCTION IF EXISTS activeCustomers(last_active timestamp);
DROP FUNCTION IF EXISTS customersOrderSummary(selected_month timestamp);
DROP FUNCTION IF EXISTS generalSummary(selected_month timestamp);
DROP FUNCTION IF EXISTS locationSummary(selected_hour timestamp);
DROP FUNCTION IF EXISTS riderSummary(selected_month timestamp);

CREATE TYPE CustomerActivity AS (cust_id VARCHAR(255));
CREATE TYPE CustomerInfo AS (cust_id VARCHAR(255), total_orders INTEGER, total_cost INTEGER);
CREATE TYPE GeneralInfo AS (total_orders INTEGER, total_cost INTEGER);
CREATE TYPE LocationInfo AS (cust_id VARCHAR(255));
CREATE TYPE RiderInfo AS (
    rider_id VARCHAR(255),
    salary NUMERIC,
    total_deliveries INTEGER,
    avg_delivery_time INTERVAL,
    total_ratings INTEGER,
    average_rating NUMERIC
    );

CREATE OR REPLACE FUNCTION inactiveCustomers(last_active timestamp)
RETURNS setof CustomerActivity AS $$

    BEGIN
    RETURN QUERY
    SELECT DISTINCT usr_id
    FROM Customers 
    WHERE usr_id NOT IN (
        SELECT * FROM activeCustomers(last_active)
    );

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION activeCustomers(last_active timestamp)
RETURNS setof CustomerActivity AS $$

    BEGIN
    RETURN QUERY
    WITH RecentDeliveries AS
        (SELECT order_id
        FROM Deliveries
        WHERE place_order_time > last_active
        )

    SELECT DISTINCT usr_id as cust_id
    FROM Orders JOIN RecentDeliveries USING (order_id);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION customersOrderSummary(selected_month timestamp)
RETURNS setof CustomerInfo AS $$

    BEGIN
    RETURN QUERY
    WITH OrderTimes AS
        (SELECT order_id, place_order_time
        FROM Deliveries
        )

    SELECT usr_id as cust_id, CAST(count(*) AS INTEGER) AS total_orders, CAST(sum(total) AS INTEGER) AS total_cost
    FROM Orders JOIN OrderTimes USING (order_id)
    WHERE DATE_PART('month', place_order_time) = DATE_PART('month', selected_month) 
    and DATE_PART('year', place_order_time) = DATE_PART('year', selected_month)
    GROUP BY usr_id;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generalSummary(selected_month timestamp)
RETURNS setof GeneralInfo AS $$

    BEGIN
    RETURN QUERY
    SELECT CAST(sum(total_orders) AS INTEGER) as total_orders, CAST(sum(total_cost) AS INTEGER) as total_cost
    FROM customersOrderSummary(selected_month);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION locationSummary(selected_hour timestamp)
RETURNS setof LocationInfo AS $$

    BEGIN
    RETURN QUERY
    SELECT usr_id as cust_id FROM Orders;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION riderSummary(selected_month timestamp)
RETURNS setof RiderInfo AS $$

    BEGIN
    RETURN QUERY
    WITH DeliveryInfo AS
    (SELECT usr_id, count(*) as total_deliveries, avg(dr_arrive_cus - dr_leave_for_res) as avg_delivery_time
    FROM Deliveries
    WHERE DATE_PART('month', place_order_time) = DATE_PART('month', selected_month) 
    and DATE_PART('year', place_order_time) = DATE_PART('year', selected_month)
    GROUP BY usr_id
    ),
    SalaryInfo AS
    (SELECT usr_id, base_salary as salary FROM Fulltimerider 
    UNION
    SELECT usr_id, base_salary as salary FROM Parttimerider
    ),
    RatingInfo AS
    (SELECT usr_id, count(*) as total_ratings, avg(delivery_rating) as average_rating
    FROM Deliveries JOIN Reviews USING (order_id)
    WHERE DATE_PART('month', place_order_time) = DATE_PART('month', selected_month) 
    and DATE_PART('year', place_order_time) = DATE_PART('year', selected_month)
    GROUP BY usr_id
    )

    SELECT usr_id as cust_id, salary, CAST(total_deliveries AS INTEGER), avg_delivery_time, CAST(total_ratings AS INTEGER), average_rating
    FROM DeliveryInfo JOIN SalaryInfo USING (usr_id) LEFT JOIN RatingInfo USING (usr_id);

    END;
$$ LANGUAGE plpgsql;