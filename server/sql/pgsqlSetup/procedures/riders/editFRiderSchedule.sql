CREATE OR REPLACE FUNCTION checkIfExistsShift( usr_id VARCHAR(255), day INTEGER) RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT *
        FROM Mws
        WHERE Mws.day = $2
        AND Mws.usr_id = $1
    );
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION checkIfConsecutive(schedule text[]) RETURNS BOOLEAN AS $$
DECLARE
   counter INTEGER := 1 ;
   arraytoCompare integer[] := array[]::integer[];
BEGIN
    WHILE counter <=  array_length($1, 1) LOOP
        IF $1[counter] = '0' THEN
            arraytoCompare := array_append(arraytoCompare, counter);
        END IF;
        counter := counter + 1;
    END LOOP;
    IF array_length(arraytoCompare,1) = 2 THEN
        IF arraytoCompare[1] + 1 = arraytoCompare[2] OR ((arraytoCompare[2] + 1) % 7 = arraytoCompare[1]) THEN
            RETURN TRUE;
        ELSE
            RETURN FALSE;
        END IF;
    ELSE
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE editFRiderSchedule( usr_id VARCHAR(255), schedule text[]) AS $$
DECLARE
   counter INTEGER := 1 ;
BEGIN
    IF NOT checkIfConsecutive($2) THEN
        RAISE EXCEPTION 'As a Full Time Rider, you must have 5 consecutive work days and no more than 5 work days!';
    END IF;
    WHILE counter <=  array_length($2, 1) LOOP
        IF $2[counter] = '0' THEN
            IF checkIfExistsShift($1, counter) THEN
                DELETE FROM MWS WHERE MWS.day = counter AND MWS.usr_id = $1;
            END IF;
        ELSE
            IF checkIfExistsShift($1, counter) THEN
                DELETE FROM MWS WHERE MWS.day = counter AND MWS.usr_id = $1;
            END IF;
            INSERT INTO MWS(usr_id, day, shift_id) VALUES ($1, counter, CAST($2[counter] AS INTEGER));
        END IF;
        counter := counter + 1;
    END LOOP;

    CALL checkFTTotalRiderWorking();
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE checkFTTotalRiderWorking() AS $$
DECLARE
   weekNum INTEGER := 1;
   dayNum INTEGER := 1 ;
   startDayTime TIME := TO_TIMESTAMP('10:00', 'HH24:MI:SS')::TIME;
   endDayTime TIME := TO_TIMESTAMP('22:00', 'HH24:MI:SS')::TIME;
   numPTRider INTEGER := 0;
   numFTRider INTEGER := 0;
   errorMessage TEXT := '';
BEGIN
    WHILE weekNum <= 4 LOOP
        WHILE dayNum <= 7 LOOP
            startDayTime := TO_TIMESTAMP('10:00', 'HH24:MI:SS')::TIME;
            WHILE startDayTime <= endDayTime LOOP
                SELECT INTO numPTRider COUNT(*)
                FROM Wws
                WHERE Wws.dayOfWeek = dayNum
                AND Wws.week = weekNum
                AND (Wws.start_time <= startDayTime AND Wws.end_time >= startDayTime);

                SELECT INTO numFTRider COUNT(*)
                FROM Mws NATURAL JOIN Shifts
                WHERE Mws.day = dayNum
                AND ((start_time1 <= startDayTime AND end_time1 >= startDayTime) OR (start_time2 <= startDayTime AND end_time2 >= endDayTime));

                IF (numFTRider + numPTRider < 5) THEN
                    errorMessage := 'You cannot change the work shift slot at day ' ||  dayNum || ',time ' || startDayTime || ' as if you do so less than 5 riders are at the time';
                    RAISE EXCEPTION '%', errorMessage;
                END IF;
                startDayTime := startDayTime + interval '1 hour';
            END LOOP;
            dayNum := dayNum + 1;
        END LOOP;
        weekNum := weekNum + 1 ;
    END LOOP;
END;
$$ LANGUAGE plpgsql;





