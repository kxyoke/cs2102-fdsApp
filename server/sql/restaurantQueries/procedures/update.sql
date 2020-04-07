/* General procedures that can be found here:
 *  - update profile (entire prof)
 *  - update menu item (name, desc, price, daily limit)
 *  - increment menu item daily_sells
 *  - reset menu item daily_sells
 *  - update promos
 */

CREATE OR REPLACE PROCEDURE
    updateRestaurantProfile(
        res_id      TEXT,
        rname       VARCHAR(255),
        address     VARCHAR(255),
        min_amount  INTEGER
    ) AS $$

    BEGIN
        UPDATE ...

    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateRestaurantFoodItem(
        res_id      TEXT,
        food_id     TEXT,
        price       NUMERIC,
        daily_limit INTEGER,
        daily_sells INTEGER,
        name        TEXT,
        description TEXT,
        imagepath   VARCHAR(255)
    ) AS $$

    BEGIN
        UPDATE ...
    END;
$$ LANGUAGE plpgsql;

