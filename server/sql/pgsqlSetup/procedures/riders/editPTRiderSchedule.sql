DROP PROCEDURE IF EXISTS editPTRiderSchedule(VARCHAR(255),text[],text);
DROP FUNCTION IF EXISTS check_time_constraints();
DROP PROCEDURE IF EXISTS checkPTTotalRiderWorking(INTEGER);

CREATE OR REPLACE PROCEDURE editPTRiderSchedule( usr_id VARCHAR(255), schedule text[][], weekNum text) AS $$
DECLARE
   counter INTEGER := 1 ;
   startTime TIME := Now();
   endTime TIME := Now();
   totalHours INTEGER := 0;
BEGIN
    -- delete all olld schedules   usr_id      VARCHAR(255) NOT NULL,
    --     dayOfWeek   INTEGER NOT NULL,
    --     week        INTEGER NOT NULL,
    --     start_time  TIME NOT NULL,
    --     end_time
    DELETE FROM WWS WHERE WWS.week = CAST($3 AS INTEGER) + 1 AND WWS.usr_id = $1;
    WHILE counter <=  array_length($2, 1) LOOP
        startTime:= TO_TIMESTAMP($2[counter][2], 'HH24:MI:SS')::TIME;
        endTime:= TO_TIMESTAMP($2[counter][3], 'HH24:MI:SS')::TIME;
        INSERT INTO WWS(usr_id, dayOfWeek, week,start_time, end_time) VALUES ($1, CAST($2[counter][1] AS INTEGER), CAST($3 AS INTEGER) + 1,startTime, endTime);
        counter := counter + 1;
        totalHours := totalHours + (EXTRACT(EPOCH FROM endTime) - EXTRACT(EPOCH FROM startTime))/3600;
    END LOOP;

    IF totalHours > 48 OR totalHours < 10 THEN
        RAISE EXCEPTION 'Total working hours must be at least 10 and at most 48';
    END IF;

    CALL checkPTTotalRiderWorking(CAST($3 AS INTEGER) + 1);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE checkPTTotalRiderWorking(weekChanged INTEGER) AS $$
DECLARE
   dayNum INTEGER := 1 ;
   startDayTime TIME := TO_TIMESTAMP('10:00', 'HH24:MI:SS')::TIME;
   endDayTime TIME := TO_TIMESTAMP('22:00', 'HH24:MI:SS')::TIME;
   numPTRider INTEGER := 0;
   numFTRider INTEGER := 0;
   errorMessage TEXT := '';
BEGIN
    WHILE dayNum <= 7 LOOP
        startDayTime := TO_TIMESTAMP('10:00', 'HH24:MI:SS')::TIME;
        WHILE startDayTime <= endDayTime LOOP
            SELECT INTO numPTRider COUNT(*)
            FROM Wws
            WHERE Wws.dayOfWeek = dayNum
            AND Wws.week = $1
            AND (Wws.start_time <= startDayTime AND Wws.end_time >= startDayTime);

            SELECT INTO numFTRider COUNT(*)
            FROM Mws NATURAL JOIN Shifts
            WHERE Mws.day = dayNum
            AND ((start_time1 <= startDayTime AND end_time1 >= startDayTime) OR (start_time2 <= startDayTime AND end_time2 >= endDayTime));

            IF (numFTRider + numPTRider < 5) THEN
                errorMessage := 'You cannot change the work slot at week ' || $1 || ', day ' ||  dayNum || ',time ' || startDayTime || ' as if you do so less than 5 riders are at the time. ' ;
                RAISE EXCEPTION '%', errorMessage;
            END IF;
            startDayTime := startDayTime + interval '1 hour';
        END LOOP;
        dayNum := dayNum + 1;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

CREATE FUNCTION check_time_constraints() RETURNS trigger AS $check_time_constraints$
    BEGIN
        -- Check that start time and end time are correct
        IF NEW.start_time >= NEW.end_time THEN
            RAISE EXCEPTION 'Start Time must be smaller than end time';
        END IF;

        IF (EXTRACT(EPOCH FROM NEW.end_time) - EXTRACT(EPOCH FROM NEW.start_time))/3600 > 4 THEN
            RAISE EXCEPTION 'Each work shift cannot exceed 4 hours';
        END IF;

        -- hour break
        IF exists (
            select *
            FROM WWS
            Where usr_id = NEW.usr_id
            AND dayOfWeek = NEW.dayOfWeek
            AND week = NEW.week
            AND (start_time = NEW.end_time OR end_time = NEW.start_time)
            ) THEN
            RAISE EXCEPTION 'At least one hour of break is needed between consecutive shifts';
        END IF;

        IF exists (
            select *
            FROM WWS
            Where usr_id = NEW.usr_id
            AND dayOfWeek = NEW.dayOfWeek
            AND week = NEW.week
            AND ((start_time = NEW.start_time OR end_time = NEW.end_time)
            OR (start_time <= NEW.start_time AND end_time >= NEW.start_time)
            OR (start_time <= NEW.end_time AND end_time >= NEW.end_time))
            ) THEN
            RAISE EXCEPTION 'Overlapping work schedule times are not allowed';
        END IF;
        RETURN NEW;
    END;
$check_time_constraints$ LANGUAGE plpgsql;





