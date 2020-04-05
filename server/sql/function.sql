CREATE OR REPLACE FUNCTION is_fds(
    usr_id%TYPE
)
RETURNS BOOLEAN AS
$func$
BEGIN
PERFROM *
FROM fdsmanager f
where usr_id = $1
;
RETURN FOUND;
END;
$func$ LANGUAGE sql;