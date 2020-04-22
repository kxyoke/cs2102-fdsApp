/* Procedure available: delete food item.
 * Making it a procedure makes it more extensible.
 */

CREATE OR REPLACE PROCEDURE
    deleteFoodItem(
        _fid     TEXT
    ) AS $$

    BEGIN
        DELETE FROM FoodItems
        WHERE food_id = _fid;
    END;
$$ LANGUAGE plpgsql;

