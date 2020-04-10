/* Procedures available here:
 *  - add menu item
 *  - add promo
 */

CREATE OR REPLACE PROCEDURE
    addRestaurantMenuItem(
        res_id      TEXT,
        food_id     TEXT,
        fname       TEXT,
        fdesc      TEXT,
        price       NUMERIC, /*if NULL, not supposed to be rendered on customer side.*/
        daily_limit INTEGER,
        imagepath   VARCHAR(255),
        category    TEXT
    ) AS $$

    BEGIN
        INSERT INTO FoodItems(food_id, name, description, imagepath, category) 
        VALUES(food_id, fname, fdesc, imagepath, category);
        INSERT INTO MenuItems(res_id, food_id, price, daily_limit)
        VALUES(res_id, food_id, price, daily_limit);
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addRestaurantPromo(
        pid         TEXT,
        res_id      TEXT,
        pdesc       TEXT,
        start_day   TIMESTAMP,
        end_day     TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO Promotions(pid, promotype, res_id, description, start_day, end_day)
        VALUES(pid, 'RES', res_id, pdesc, start_day, end_day);
    END;
$$ LANGUAGE plpgsql;

