
CREATE OR REPLACE FUNCTION getResDefaultPromo(description TEXT,
                                              amount_to_qualify   OUT NUMERIC,
                                              discount            OUT NUMERIC,
                                              default_type        OUT TEXT)
AS $$
    DECLARE
        desStr      TEXT;
        amt         NUMERIC;
        discount    NUMERIC;
        dType       TEXT;
    BEGIN
        IF split_part(description, ':', 1) <> 'DEFAULT' THEN
            RAISE EXCEPTION 'can only use this fn on default res promos.';
        END IF;
        desStr := split_part(description, ':', 2);
        IF split_part(desStr, ';', 2) = 'absolute' THEN
            dType := '$';
        ELSE
            dType := '%';
        END IF;
        amt := CAST(split_part(desStr, ';', 1) AS NUMERIC);
        discount := CAST(split_part(desStr, ';', 3) AS NUMERIC);
        RETURN (amt, discount, dType);
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getCost( _rid         TEXT,
                                    _listOfItems TEXT[][],
                                    _orderTime   TIMESTAMP)
    RETURNS NUMERIC AS $$
    DECLARE
        total       NUMERIC := 0;
        fidCount    TEXT[];
        fid         TEXT;
        cnt         INTEGER;
        pDesc       TEXT;
        details     RECORD;
    BEGIN
        FOREACH fidCount SLICE 1 IN ARRAY _listOfItems
        LOOP
            fid := fidCount[1];
            cnt := CAST(fidCount[1] AS INTEGER);
            total := total + cnt * (SELECT price FROM MenuItems WHERE res_id = _rid AND food_id = fid);
        END LOOP;

        --Add PROMOTION DISCOUNTS (any that matches condition)
        FOREACH pDesc IN ( -- as a nice fds we allow composed promotions
            SELECT description FROM Promotions 
            WHERE res_id IS NOT DISTINCT FROM _rid 
            AND start_day <= _orderTime AND end_day >= _orderTime
            ORDER BY description ASC --so we take absolute discounts then perc :]
        ) LOOP
            details := getResDefaultPromo(pDesc);
            IF total >= details.amount_to_qualify THEN
                IF details.default_type = '%' THEN
                    total := total * details.discount / 100;
                ELSE
                    total := total - details.discount;
                END IF;
            END IF;
        END LOOP;
        
        RETURN total;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION getFoodNumOrders(_rid        TEXT,
                                            _fid        TEXT,
                                            _from       TIMESTAMP,
                                            _to         TIMESTAMP)
    RETURNS INTEGER AS $$
    numOrders       INTEGER := 0;
    fidCount        TEXT[];
    BEGIN
        FOREACH fidCount SLICE 1 IN (
            SELECT listOfItems 
            FROM Orders JOIN Deliveries USING (order_id)
            WHERE res_id = _rid
            AND place_order_time >= _from
            AND place_order_time <= _to
        ) LOOP
            IF fidCount[1] = _fid THEN
                numOrders := numOrders + 1;
            END IF;
        END LOOP;
        RETURN numOrders;
    END;
$$ LANGUAGE plpgsql;

