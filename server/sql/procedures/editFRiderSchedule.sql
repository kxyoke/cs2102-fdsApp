CREATE OR REPLACE PROCEDURE editFRiderSchedule( usr_id VARCHAR(255), schedule text[]) AS $$
DECLARE
   counter INTEGER := 1 ;
BEGIN

    WHILE counter <  array_length($2, 1) LOOP

        IF $2[counter] = '0' THEN


        ELSE
            DELETE FROM MWS WHERE MWS.day = counter AND MWS.usr_id = $1;
            INSERT INTO MWS(usr_id, day, shift_id) VALUES ($1, counter, CAST($2[counter] AS INTEGER));
        END IF;
        counter := counter + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;



