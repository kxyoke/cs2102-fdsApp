DROP FUNCTION IF EXISTS inactiveCustomers(last_active timestamp);
DROP FUNCTION IF EXISTS activeCustomers(last_active timestamp);
DROP FUNCTION IF EXISTS customersOrderSummary(selected_month timestamp);
DROP FUNCTION IF EXISTS generalSummary(selected_month timestamp);
DROP FUNCTION IF EXISTS locationSummary(selected_hour timestamp);
DROP FUNCTION IF EXISTS riderSummary(selected_month timestamp);
DROP TYPE IF EXISTS CustomerActivity;
DROP TYPE IF EXISTS CustomerInfo;
DROP TYPE IF EXISTS GeneralInfo;
DROP TYPE IF EXISTS LocationInfo;
DROP TYPE IF EXISTS RiderInfo;

CREATE TYPE CustomerActivity AS (cust_id VARCHAR(255));
CREATE TYPE CustomerInfo AS (cust_id VARCHAR(255), total_orders INTEGER, total_cost NUMERIC);
CREATE TYPE GeneralInfo AS (total_orders INTEGER, total_cost NUMERIC);
CREATE TYPE LocationInfo AS (area TEXT, total_orders INTEGER);
CREATE TYPE RiderInfo AS (
    rider_id VARCHAR(255),
    salary NUMERIC,
    total_deliveries INTEGER,
    avg_delivery_time DOUBLE PRECISION,
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

    SELECT usr_id as cust_id, CAST(count(place_order_time) AS INTEGER) AS total_orders,
            CASE
            WHEN(count(total) >0) THEN
                 CAST(sum(total) AS NUMERIC) 
            ELSE 0
            END
                AS total_cost
    FROM customers LEFT JOIN (Orders JOIN OrderTimes ON (orders.order_id=ordertimes.order_id)
    AND DATE_PART('month', place_order_time) = DATE_PART('month', selected_month) 
    and DATE_PART('year', place_order_time) = DATE_PART('year', selected_month)) using (usr_id)
    GROUP BY usr_id
    ORDER BY total_orders DESC;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION generalSummary(selected_month timestamp)
RETURNS setof GeneralInfo AS $$

    BEGIN
    RETURN QUERY
    SELECT CAST(sum(total_orders) AS INTEGER) as total_orders, CAST(sum(total_cost) AS NUMERIC) as total_cost
    FROM customersOrderSummary(selected_month);

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION locationSummary(selected_month timestamp)
RETURNS setof LocationInfo AS $$

    BEGIN
    RETURN QUERY
    WITH LocationsDelivered AS
    (SELECT postal_code
    FROM Orders JOIN Deliveries USING (order_id)
    WHERE DATE_PART('month', place_order_time) = DATE_PART('month', selected_month) 
    and DATE_PART('year', place_order_time) = DATE_PART('year', selected_month)
    ),
    NorthDelivered AS (
        SELECT 'North' as area, CAST(count(*) AS INTEGER) as total_orders
        FROM LocationsDelivered
        WHERE postal_code SIMILAR TO '25[0-9]{4}'
        OR postal_code SIMILAR TO '26[0-9]{4}'
        OR postal_code SIMILAR TO '27[0-9]{4}'
        OR postal_code SIMILAR TO '28[0-9]{4}'
    ),
    SouthDelivered AS (
        SELECT 'South' as area, CAST(count(*) AS INTEGER) as total_orders
        FROM LocationsDelivered
        WHERE postal_code SIMILAR TO '1[0-9]{5}'
        OR postal_code SIMILAR TO '2[0-9]{5}'
        OR postal_code SIMILAR TO '3[0-9]{5}'
        OR postal_code SIMILAR TO '4[0-9]{5}'
        OR postal_code SIMILAR TO '5[0-9]{5}'
        OR postal_code SIMILAR TO '6[0-9]{5}'
        OR postal_code SIMILAR TO '7[0-9]{5}'
        OR postal_code SIMILAR TO '8[0-9]{5}'
        OR postal_code SIMILAR TO '9[0-9]{5}'
        OR postal_code SIMILAR TO '10[0-9]{4}'
    ),
    EastDelivered AS (
        SELECT 'East' as area, CAST(count(*) AS INTEGER) as total_orders
        FROM LocationsDelivered
        WHERE postal_code SIMILAR TO '14[0-9]{4}'
        OR postal_code SIMILAR TO '15[0-9]{4}'
        OR postal_code SIMILAR TO '16[0-9]{4}'
        OR postal_code SIMILAR TO '17[0-9]{4}'
        OR postal_code SIMILAR TO '18[0-9]{4}'
        OR postal_code SIMILAR TO '19[0-9]{4}'
    ),
    WestDelivered AS (
        SELECT 'West' as area, CAST(count(*) AS INTEGER) as total_orders
        FROM LocationsDelivered
        WHERE postal_code SIMILAR TO '22[0-9]{4}'
        OR postal_code SIMILAR TO '23[0-9]{4}'
        OR postal_code SIMILAR TO '24[0-9]{4}'
    ),
    CentralDelivered AS (
        SELECT 'Central' as area, CAST(count(*) AS INTEGER) as total_orders
        FROM LocationsDelivered
        WHERE postal_code SIMILAR TO '11[0-9]{4}'
        OR postal_code SIMILAR TO '12[0-9]{4}'
        OR postal_code SIMILAR TO '13[0-9]{4}'
        OR postal_code SIMILAR TO '20[0-9]{4}'
        OR postal_code SIMILAR TO '21[0-9]{4}'
    )

    SELECT area, total_orders FROM NorthDelivered
    UNION
    SELECT area, total_orders FROM SouthDelivered
    UNION
    SELECT area, total_orders FROM EastDelivered
    UNION
    SELECT area, total_orders FROM WestDelivered
    UNION
    SELECT area, total_orders FROM CentralDelivered;

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION riderSummary(selected_month timestamp)
RETURNS setof RiderInfo AS $$

    BEGIN
    RETURN QUERY
    WITH DeliveryInfo AS
    (SELECT usr_id, count(*) as total_deliveries, EXTRACT(epoch FROM avg(dr_arrive_cus - dr_leave_for_res))/60 as avg_delivery_time
    FROM Deliveries RIGHT JOIN RIDERS using (usr_id)
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

    SELECT usr_id as cust_id, 
        CASE
            WHEN (total_deliveries IS NOT NULL) THEN
                    (salary+total_deliveries * 3) 
            ELSE salary
            END AS salary, 
        CASE 
            WHEN (total_deliveries IS NOT NULL) THEN
                CAST(total_deliveries AS INTEGER)
            ELSE 0
            END AS total_deliveries,
        CASE
            WHEN (avg_delivery_time IS NOT NULL) THEN
                avg_delivery_time
            ELSE 0
            END AS avg_delivery_time,
        CASE 
            WHEN(total_ratings IS NOT NULL) THEN
                CAST(total_ratings AS INTEGER)
            ELSE 0
            END AS total_ratings,
        CASE 
            WHEN(average_rating IS NOT NULL) THEN
                average_rating
            ELSE 0
            END AS average_rating
    FROM DeliveryInfo RIGHT JOIN SalaryInfo USING (usr_id) LEFT JOIN RatingInfo USING (usr_id)
    ORDER BY total_deliveries DESC;

    END;
$$ LANGUAGE plpgsql;