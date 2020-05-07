DROP FUNCTION IF EXISTS getRiderSalary(text, text[]);

CREATE OR REPLACE FUNCTION getRiderSalary(idOfUser text, time_range text[] ) RETURNS DOUBLE PRECISION  AS $$
DECLARE
    toSalary INTEGER := 0;
    finalSalary DOUBLE PRECISION := 0;
    startWeek INTEGER := CAST ($2[2] AS INTEGER);
    endWeek INTEGER := CAST ($2[4] AS INTEGER);
    startMonth INTEGER := CAST ($2[1] AS INTEGER);
    endMonth INTEGER := CAST ($2[3] AS INTEGER);
    weekDifference INTEGER := 0;
BEGIN
    weekDifference := ((endMonth - startMonth) * 4 ) + (endWeek - startWeek) + 1;
    IF exists (select * FROM Fulltimerider Where usr_id = $1) THEN
        select INTO toSalary base_salary FROM Fulltimerider Where Fulltimerider.usr_id = $1;
        finalSalary := toSalary/4 * weekDifference;
    ELSE
        select INTO toSalary base_salary FROM Parttimerider Where Parttimerider.usr_id = $1;
        finalSalary := toSalary * weekDifference;
    END IF;
    RETURN finalSalary;
END;
$$ LANGUAGE plpgsql;





