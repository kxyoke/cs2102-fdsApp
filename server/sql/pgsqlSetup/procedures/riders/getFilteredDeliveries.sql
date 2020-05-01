DROP FUNCTION IF EXISTS getFilteredDeliveries(text, text[]);
DROP FUNCTION IF EXISTS identifyDay(text);

CREATE OR REPLACE FUNCTION identifyDay(weekValue text) RETURNS Text AS $$
BEGIN
    IF ($1 = '1') THEN
        RETURN '1';
    ELSIF ($1 = '2') THEN
        RETURN '8';
    ELSIF ($1 = '3') THEN
        RETURN '15';
    ELSE
        RETURN '22';
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getFilteredDeliveries(usr_id text, time_range text[] ) RETURNS table (j json) AS $$
DECLARE
    arrayToReturn text[] := array[]::text[];
    startDay Text := '';
    endDay Text := '';
    startDate TIMESTAMP := Now();
    endDate TIMESTAMP := Now();
BEGIN
    startDay := identifyDay($2[2]);
    endDay := identifyDay($2[4]);
    IF startDay = endDay AND $2[1] = $2[3] THEN
        startDate := TO_DATE('2020/' || CAST($2[1] AS TEXT) || '/' || startDay, 'YYYY/MM/DD');
        endDate := startDate + interval '1 week';
    ELSE
        startDate := TO_DATE('2020/' || CAST($2[1] AS TEXT) || '/' || startDay, 'YYYY/MM/DD');
        endDate := TO_DATE('2020/' || CAST($2[3] AS TEXT) || '/' || endDay, 'YYYY/MM/DD');
    END IF;

    RETURN QUERY SELECT to_json(a) FROM (
        SELECT *
        FROM Deliveries JOIN Orders ON Orders.order_id = Deliveries.order_id
        WHERE place_order_time >= startDate
        AND place_order_time < endDate
        AND Deliveries.usr_id = $1
        AND Orders.status = 'complete'
    ) a;
END;
$$ LANGUAGE plpgsql;






