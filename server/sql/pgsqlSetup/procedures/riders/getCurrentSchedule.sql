CREATE OR REPLACE FUNCTION getCurrentSchedule(usr_id text) RETURNS BOOLEAN AS $$
DECLARE
    startDay Text := '';
    endDay Text := '';
    startDate TIMESTAMP := Now();
    endDate TIMESTAMP := Now();
BEGIN
    IF exists (select * FROM Fulltimerider Where Fulltimerider.usr_id = $1) THEN
        IF exists (SELECT * FROM Mws WHERE Mws.usr_id = $1) THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    ELSE
        IF exists (SELECT * FROM Wws WHERE Wws.usr_id = $1 AND Wws.week = 1) AND
        exists (SELECT * FROM Wws WHERE Wws.usr_id = $1 AND Wws.week = 2) AND
        exists (SELECT * FROM Wws WHERE Wws.usr_id = $1 AND Wws.week = 3) AND
        exists (SELECT * FROM Wws WHERE Wws.usr_id = $1 AND Wws.week = 4) THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    END IF;


END;
$$ LANGUAGE plpgsql;