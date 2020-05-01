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
        _rid         TEXT,
        _fid         TEXT,
        _fprice      NUMERIC,
        _dailyLmt    INTEGER,
        _fname       TEXT,
        _fdesc       TEXT,
        _fimgpath    TEXT,
        _fcategory   TEXT
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET price       = _fprice,
            name        = _fname,
            description = _fdesc,
            category    = _fcategory,
            daily_limit = _dailyLmt
        WHERE
            food_id = _fid AND res_id = _rid;

        IF _fimgpath IS NOT NULL AND _fimgpath <> '' THEN
            UPDATE MenuItems
            SET imagepath = _fimgpath
            WHERE food_id = _fid AND res_id = _rid;
        END IF;
    END;
$$ LANGUAGE plpgsql;

/*
CREATE OR REPLACE PROCEDURE
    updateCategoryOf(
        _rid     TEXT,
        _fid     TEXT,
        _cat     TEXT
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET category = _cat
        WHERE food_id = _fid AND res_id = _rid;
    END;
$$ LANGUAGE plpgsql;
*/
CREATE OR REPLACE PROCEDURE
    updateAvailabilityOf(
        _rid     TEXT,
        _fid     TEXT,
        _avail   BOOLEAN
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET available = _avail
        WHERE food_id = _fid AND res_id = _rid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    incrementSoldFoodItem(
        _rid     TEXT,
        _fid     TEXT,
        _amt     INTEGER
    ) AS $$

    BEGIN
        IF (_rid, _fid, current_date) NOT IN (SELECT res_id, food_id FROM MenuItemsSold) THEN
            INSERT INTO MenuItemsSold(res_id, food_id) VALUES(_rid, _fid);
        END IF;

        UPDATE MenuItemsSold
        SET daily_sells = daily_sells + _amt
        WHERE food_id = _fid AND res_id = _rid;
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

