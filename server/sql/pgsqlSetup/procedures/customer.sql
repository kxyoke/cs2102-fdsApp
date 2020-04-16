CREATE OR REPLACE PROCEDURE 
    addCartItem(usr_id VARCHAR(255),
            res_id TEXT,
            food_id TEXT,
            qty  INTEGER) AS $$
BEGIN
    INSERT INTO CartItems (usr_id, res_id, food_id, qty) VALUES(usr_id, res_id, food_id, qty);
END;
$$ LANGUAGE plpgsql;