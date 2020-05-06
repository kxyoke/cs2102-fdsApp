/* Procedure available: delete food item.
 * Making it a procedure makes it more extensible.
 */

CREATE OR REPLACE PROCEDURE
    deleteFoodItem(
        _rid     TEXT,
        _fid     TEXT
    ) AS $$

    BEGIN
        DELETE FROM MenuItems
        WHERE food_id = _fid AND res_id = _rid;
    END;
$$ LANGUAGE plpgsql;

