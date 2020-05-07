CREATE OR REPLACE PROCEDURE updateDeliveryTime(rusr_id text, odr_id text) AS $$
DECLARE
    sequenceOfTimeUpdates text[] := '{"dr_arrive_res", "dr_leave_res", "dr_arrive_cus"}';
    arriveResTime text := '';
    leaveResTime text := '';
    arriveCusTime text:= '';
BEGIN
    arriveResTime := (SELECT dr_arrive_res from Deliveries where Deliveries.order_id = $2);
    leaveResTime := (SELECT dr_leave_res from Deliveries where Deliveries.order_id = $2);
    arriveCusTime := (SELECT dr_arrive_cus from Deliveries where Deliveries.order_id = $2);

    IF arriveResTime IS NULL THEN
        UPDATE  Deliveries SET dr_arrive_res = Now() WHERE Deliveries.order_id = $2;
    ELSIF leaveResTime IS NULL THEN
        UPDATE  Deliveries SET dr_leave_res = Now() WHERE Deliveries.order_id = $2;
    ELSE
        UPDATE  Deliveries SET dr_arrive_cus = Now() WHERE Deliveries.order_id = $2;
        UPDATE  Orders Set status = 'complete' WHERE Orders.order_id = $2;
    END IF;

END;
$$ LANGUAGE plpgsql;





