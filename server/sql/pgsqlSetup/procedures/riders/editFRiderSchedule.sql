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
        RAISE EXCEPTION 'Not Consecutive';
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
END;
$$ LANGUAGE plpgsql;





