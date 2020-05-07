DROP PROCEDURE IF EXISTS checkIfRiderDriving(text,text);

CREATE OR REPLACE PROCEDURE checkIfRiderDriving(usr_id text, order_id text) AS $$
BEGIN
    IF exists (select * from Deliveries INNER JOIN Orders ON Deliveries.order_id = Orders.order_id where Deliveries.usr_id = $1 And Orders.status = 'in progress') THEN
        RAISE EXCEPTION '%', 'Rider already has a delivery in progress';
    ELSE
        UPDATE  Deliveries SET usr_id = $1, dr_leave_for_res = Now() WHERE Deliveries.order_id = $2;
        UPDATE  Orders Set status = 'in progress' WHERE Orders.order_id = $2;
        COMMIT;
    END IF;
END;
$$ LANGUAGE plpgsql;





