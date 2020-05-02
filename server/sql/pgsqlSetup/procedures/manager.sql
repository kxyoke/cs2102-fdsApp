CREATE OR REPLACE PROCEDURE
    updateManagerPromo(
        promo_id     TEXT,
        pdesc   TEXT,
        startd  TIMESTAMP,
        endd    TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE Promotions
        SET description = pdesc,
            start_day = startd,
            end_day = endd
        WHERE pid = promo_id;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateCoupon(
        group_id     TEXT,
        cdesc   VARCHAR(255),
        expd    TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE CouponGroups
        SET description = cdesc,
            expiry_date = expd
        WHERE coupon_group_id = group_id;

    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addManagerPromo(
        promo_id     TEXT,
        pdesc   TEXT,
        startd  TIMESTAMP,
        endd    TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO Promotions(pid, promotype, res_id, description, start_day, end_day)
        VALUES(promo_id, 'FDS', NULL, pdesc, startd, endd);
    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addCoupon(
        group_id     TEXT,
        cdesc   VARCHAR(255),
        expd    TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO CouponGroups(group_id, description, expiry_date)
        VALUES(group_id, NULL, cdesc, expd);
    END
$$ LANGUAGE plpgsql;
