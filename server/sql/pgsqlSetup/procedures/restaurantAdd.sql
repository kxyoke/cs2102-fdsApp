/* Procedures available here:
 *  - add menu item
 *  - add promo
 */

CREATE OR REPLACE PROCEDURE
    addRestaurantMenuItem(
        _res_id      TEXT,
        _food_id     TEXT,
        _fname       TEXT,
        _fdesc      TEXT,
        _price       NUMERIC, /*if NULL, not supposed to be rendered on customer side.*/
        _daily_limit INTEGER,
        _imagepath   TEXT,
        _category    TEXT
    ) AS $$

    BEGIN
        INSERT INTO FoodItems(food_id, name, description, category) 
        VALUES(_food_id, _fname, _fdesc, _category);
        INSERT INTO MenuItems(res_id, food_id, price, daily_limit)
        VALUES(_res_id, _food_id, _price, _daily_limit);

        IF _imagepath IS NOT NULL AND _imagepath <> '' THEN
            UPDATE FoodItems
            SET imagepath = _imagepath
            WHERE food_id = _food_id;
        END IF;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addRestaurantPromo(
        _pid         TEXT,
        _res_id      TEXT,
        _pdesc       TEXT,
        _start_day   TIMESTAMP,
        _end_day     TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO Promotions(pid, promotype, res_id, description, start_day, end_day)
        VALUES(_pid, 'RES', _res_id, _pdesc, _start_day, _end_day);
    END;
$$ LANGUAGE plpgsql;

