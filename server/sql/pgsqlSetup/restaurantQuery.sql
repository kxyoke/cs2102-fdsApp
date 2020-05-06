
CREATE OR REPLACE FUNCTION getResDefaultPromo(description TEXT,
                                              amount_to_qualify   OUT NUMERIC,
                                              discount            OUT NUMERIC,
                                              default_type        OUT TEXT)
AS $$
    DECLARE
        desStr      TEXT;
    BEGIN
        IF split_part(description, ':', 1) <> 'DEFAULT' THEN
            RAISE EXCEPTION 'can only use this fn on default res promos.';
        END IF;
        desStr := split_part(description, ':', 2);
        RAISE NOTICE 'got %',desStr;
        IF split_part(desStr, ';', 1) = 'absolute' THEN
            default_type := '$';
        ELSE
            default_type := '%';
        END IF;
        amount_to_qualify := CAST(split_part(desStr, ';', 2) AS NUMERIC);
        discount := CAST(split_part(desStr, ';', 3) AS NUMERIC);
        RETURN;
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
        pDescs      TEXT[];
        pDesc       TEXT;
        details     RECORD;
    BEGIN
        FOREACH fidCount SLICE 1 IN ARRAY _listOfItems
        LOOP
            fid := fidCount[1];
            cnt := CAST(fidCount[2] AS INTEGER);
            total := total + cnt * (SELECT price FROM MenuItems WHERE res_id = _rid AND food_id = fid);
        END LOOP;

        --Add PROMOTION DISCOUNTS (any that matches condition)
        pDescs := ARRAY (  -- as a nice fds we allow composed promotions
            SELECT description FROM Promotions 
            WHERE res_id IS NOT DISTINCT FROM _rid 
            AND start_day <= _orderTime AND end_day >= _orderTime
            ORDER BY description ASC --so we take absolute discounts then perc :]
        );
        IF COALESCE(pDescs = '{}', TRUE) THEN
            RETURN total;
        END IF;

        FOREACH pDesc IN ARRAY pDescs
        LOOP
            details := getResDefaultPromo(pDesc);
            IF total >= details.amount_to_qualify THEN
                IF details.default_type = '%' THEN
                    total := total * (1 - details.discount / 100);
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
    DECLARE
    numOrders       INTEGER := 0;
    record          TEXT[][];
    lists           TEXT[][] := ARRAY[]::TEXT[][];
    fidCount        TEXT[];
    BEGIN
        FOR record in (
            SELECT listOfItems 
            FROM Orders JOIN Deliveries USING (order_id)
            WHERE res_id = _rid
            AND place_order_time >= _from
            AND place_order_time <= _to
        ) LOOP
            lists := array_cat(lists, record);
        END LOOP;

        IF COALESCE(lists = '{}', TRUE) THEN
            RETURN 0;
        END IF;

        FOREACH fidCount SLICE 1 IN ARRAY lists 
        LOOP
            IF fidCount[1] = _fid THEN
                numOrders := numOrders + 1;
            END IF;
        END LOOP;
        RETURN numOrders;
    END;
$$ LANGUAGE plpgsql;

