/* General procedures that can be found here:
 *  - update profile (entire prof)
 *  - update menu item (name, desc, price, daily limit)
 *  - increment menu item daily_sells
 *  - reset menu item daily_sells
 *  - update promos
 */

CREATE OR REPLACE PROCEDURE
    updateRestaurantProfile(
        rid         TEXT,
        rName       TEXT,
        raddress     TEXT,
        rmin_amount  NUMERIC
    ) AS $$

    BEGIN
        UPDATE Restaurants
        SET rname   = rName,
            address = raddress,
            min_amount = rmin_amount
        WHERE
            res_id = rid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateRestaurantFoodItem(
        fid         TEXT,
        fprice      NUMERIC,
        dailyLmt    INTEGER,
        fname       TEXT,
        fdesc       TEXT,
        fimgpath    VARCHAR(255)
    ) AS $$

    BEGIN
        UPDATE FoodItems
        SET name        = fname,
            description = fdesc,
            imagepath   = fimgpath
        WHERE
            food_id = fid;

        UPDATE MenuItems
        SET price       = fprice,
            daily_limit = dailyLmt
        WHERE
            food_id = fid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    incrementSoldFoodItem(
        fid     TEXT
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET daily_sells = daily_sells + 1
        WHERE food_id = fid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    resetDailySellsForFoodItem(
        fid     TEXT
    ) AS $$

    BEGIN
        UPDATE MenuItems
        SET daily_sells = DEFAULT
        WHERE food_id = fid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateRestaurantPromo(
        pId     TEXT,
        pdesc   TEXT,
        startd  TIMESTAMP,
        endd    TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE Promotions
        SET description = pdesc,
            start_day   = startd,
            end_day     = endd
        WHERE
            pid = pId;
    END;
$$ LANGUAGE plpgsql;

