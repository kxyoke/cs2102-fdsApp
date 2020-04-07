

CREATE OR REPLACE addMenuItem(res_id TEXT,
                            food_id TEXT,
                            price NUMERIC,
                            qty INTEGER DEFAULT 20) as $$
BEGIN
    INSERT INTO MenuItems(res_id, food_id, price, daily_limit) VALUES (res_id, food_id, price, qty);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE addFoodITEM(food_id TEXT,
                                name TEXT,
                                desc TEXT,) as $$
BEGIN
    INSERT INTO FoodItem(food_id, name, description) VALUES(food_id, name, des);
END;
$$ LANGUAGE plpgsql;
