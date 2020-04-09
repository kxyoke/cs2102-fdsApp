/* General procedures that can be found here:
 *  - update profile (entire prof)
 *  - update menu item (name, desc, price, daily limit)
 *  - increment menu item daily_sells
 *  - reset menu item daily_sells
 *  - update promos
 */

CREATE OR REPLACE PROCEDURE
    updateRestaurantProfile(
        _rid         TEXT,
        _rname       TEXT,
        _address     TEXT,
        _min_amount  NUMERIC
    ) AS $$

    BEGIN
        UPDATE Restaurants
        SET rname   = _rname,
            address = _address,
            min_amount = _min_amount
        WHERE
            res_id = _rid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateRestaurantFoodItem(
        _fid         TEXT,
        _fprice      NUMERIC,
        _dailyLmt    INTEGER,
        _fname       TEXT,
        _fdesc       TEXT,
        _fimgpath    VARCHAR(255)
    ) AS $$

    BEGIN
        UPDATE FoodItems
        SET name        = _fname,
            description = _fdesc,
            imagepath   = _fimgpath
        WHERE
            food_id = _fid;

        UPDATE MenuItems
        SET price       = _fprice,
            daily_limit = _dailyLmt
        WHERE
            food_id = _fid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    incrementSoldFoodItem(
        _fid     TEXT
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET daily_sells = daily_sells + 1
        WHERE food_id = _fid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    resetDailySellsForFoodItem(
        _fid     TEXT
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET daily_sells = DEFAULT
        WHERE food_id = _fid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateRestaurantPromo(
        _pid     TEXT,
        _pdesc   TEXT,
        _startd  TIMESTAMP,
        _endd    TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE Promotions
        SET description = _pdesc,
            start_day   = _startd,
            end_day     = _endd
        WHERE
            pid = _pid;
    END;
$$ LANGUAGE plpgsql;

