DROP FUNCTION IF EXISTS getRiderSalary(text);

CREATE OR REPLACE FUNCTION getRiderSalary(idOfUser text) RETURNS INTEGER AS $$
DECLARE
    toSalary INTEGER := 0;
BEGIN
    IF exists (select * FROM Fulltimerider Where usr_id = $1) THEN
        select INTO toSalary base_salary FROM Fulltimerider Where Fulltimerider.usr_id = $1;
    ELSE
        select INTO toSalary base_salary FROM Parttimerider Where Parttimerider.usr_id = $1;
    END IF;
    RETURN toSalary;
END;
$$ LANGUAGE plpgsql;





