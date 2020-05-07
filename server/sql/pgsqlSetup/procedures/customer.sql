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
            new_address TEXT,
            new_postal TEXT
            ) AS $$

BEGIN
    UPDATE Customers_address 
    SET  address = new_address,
        postal_code = new_postal,
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

CREATE OR REPLACE PROCEDURE 
    addAddress(u_id VARCHAR(255),
            new_address TEXT,
            new_postal  TEXT
            ) AS $$
BEGIN
    INSERT INTO Customers_address VALUES(u_id, new_address, new_postal, NOW());
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE updateCard(u_id VARCHAR(255), card INTEGER)
AS $$
BEGIN
    UPDATE Customers
    SET card_num = card
    WHERE usr_id = u_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE 
    addReview(o_id TEXT,
            rev TEXT,
            rate NUMERIC
            ) AS $$
BEGIN
    INSERT INTO Reviews VALUES(o_id, rev, rate);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    placeOrder(o_id TEXT,
                u_id VARCHAR(255),
                r_id TEXT,
                _total NUMERIC,
                address TEXT,
                payBy VARCHAR(255),
                items TEXT[][],
                d_fee NUMERIC,
                rp_used INTEGER
                )
AS $$

BEGIN
    INSERT INTO orders(
                        order_id,
                        usr_id, 
                        res_id, 
                        total, 
                        destination_address, 
                        payment, 
                        listofitems, 
                        status) 
                VALUES (
                    o_id,
                    u_id,
                    r_id,
                    _total,
                    address,
                    payBy,
                    items,
                    'pending'
                );

    INSERT INTO deliveries(order_id, delivery_fee,place_order_time)
                VALUES(o_id,d_fee,NOW());

    DELETE FROM CartItems WHERE usr_id= u_id;
    UPDATE Customers set reward_points = reward_points-rp_used WHERE usr_id = u_id;
END;
$$ LANGUAGE plpgsql;
