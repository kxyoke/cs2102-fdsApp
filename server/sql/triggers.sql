
CREATE OR REPLACE FUNCTION checkInsertUser() RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM users
        WHERE username = NEW.username) THEN
        RAISE EXCEPTION 'username in used';
    -- ELSIF EXISTS(
    --     SELECT 1 
    --     FROM users
    --     where usr_id = NEW.usr_id) THEN
    --     RAISE EXCEPTION 'usr_id in used';
         END IF;
    
    RETURN NEW;
    END
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS checkInsertUser ON Users;
CREATE TRIGGER checkInsertUser
    BEFORE  UPDATE OF usr_id, username OR INSERT ON Users
    FOR EACH ROW
    EXECUTE FUNCTION checkInsertUser();

    
