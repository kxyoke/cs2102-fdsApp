CREATE OR REPLACE PROCEDURE 
    addCart(usr_id VARCHAR(255)) AS $$
BEGIN
    INSERT INTO Carts (usr_id) VALUES(usr_id);
END;
$$ LANGUAGE plpgsql;