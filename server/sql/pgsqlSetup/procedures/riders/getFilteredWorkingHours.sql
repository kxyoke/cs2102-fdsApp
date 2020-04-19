DROP FUNCTION IF EXISTS getFilteredWorkingHours(text, text[]);
DROP FUNCTION IF EXISTS countWeeklyFTHours(text);
DROP FUNCTION IF EXISTS countWeeklyPTHours(text, integer);

CREATE OR REPLACE FUNCTION countWeeklyFTHours(rider_id text) RETURNS INTEGER AS $$
DECLARE
    toReturnFT INTEGER := 0;
BEGIN
    WITH timeDiffTable AS (
        SELECT usr_id,(EXTRACT(EPOCH FROM (end_time1)) - EXTRACT(EPOCH FROM (start_time1)))/60 AS time_diff1,(EXTRACT(EPOCH FROM (end_time2)) - EXTRACT(EPOCH FROM (start_time2)))/60 AS time_diff2
        FROM Mws NATURAL JOIN Shifts
        WHERE usr_id = $1
    )
    SELECT INTO toReturnFT SUM (time_diff1 + time_diff2) FROM timeDiffTable;
    RETURN toReturnFT;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION countWeeklyPTHours(rider_id text, weekGiven INTEGER) RETURNS INTEGER AS $$
DECLARE
    toReturn INTEGER := 0;
BEGIN
    WITH timeDiffWeekTable AS (
        SELECT dayOfWeek, (EXTRACT(EPOCH FROM (end_time)) - EXTRACT(EPOCH FROM (start_time)))/60 AS time_diff
        FROM Wws
        WHERE usr_id = $1
        AND week = $2
    )
    SELECT INTO toReturn SUM(time_diff) FROM timeDiffWeekTable AS INTEGER;
    RETURN toReturn;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getFilteredWorkingHours(rider_id text, time_range text[] ) RETURNS INTEGER AS $$
DECLARE
    arrayToReturn text[] := array[]::text[];
    startWeek INTEGER := CAST ($2[2] AS INTEGER);
    endWeek INTEGER := CAST ($2[4] AS INTEGER);
    startMonth INTEGER := CAST ($2[1] AS INTEGER);
    endMonth INTEGER := CAST ($2[3] AS INTEGER);
    weekDifference INTEGER := 0;
    sumOfHours INTEGER := 0;
BEGIN
    weekDifference := ((endMonth - startMonth) * 4 ) + (endWeek - startWeek) + 1;
    IF exists (select * FROM Fulltimerider Where usr_id = $1) THEN
        RETURN weekDifference * countWeeklyFTHours($1) / 60;
    ELSE
        WHILE weekDifference != 0 LOOP
            IF (startWeek > 4 ) THEN
                startWeek := 1;
            END IF;
            sumOfHours := sumOfHours + countWeeklyPTHours($1, startWeek);
            startWeek := startWeek + 1;
            weekDifference := weekDifference - 1;
        END LOOP;
        RETURN sumOfHours/60;
    END IF;
END;
$$ LANGUAGE plpgsql;






