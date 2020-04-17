CREATE OR REPLACE PROCEDURE 
    addCartItem(usr_id VARCHAR(255),
            res_id TEXT,
            food_id TEXT,
            qty  INTEGER) AS $$
BEGIN
    INSERT INTO CartItems (usr_id, res_id, food_id, qty) VALUES(usr_id, res_id, food_id, qty);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE 
    updateAddress(u_id VARCHAR(255),
            old_address TEXT,
            new_address TEXT
            ) AS $$

BEGIN
    UPDATE Customers_address 
    SET  address = new_address,
     last_use_time = Now()
    WHERE Customers_address.usr_id = u_id
    AND address = old_address;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE 
    deleteAddress(u_id VARCHAR(255),
            old_address TEXT
            ) AS $$
BEGIN
    DELETE FROM Customers_address 
    WHERE Customers_address.usr_id = u_id
    AND address = old_address;
END;
$$ LANGUAGE plpgsql;