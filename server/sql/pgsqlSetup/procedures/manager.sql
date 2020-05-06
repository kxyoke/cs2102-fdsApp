CREATE OR REPLACE PROCEDURE
    updateManagerPromo(
        promo_id     TEXT,
        pdesc        TEXT,
        startd       TIMESTAMP,
        enddate      TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE Promotions
        SET description = pdesc,
            start_day = startd,
            end_day = enddate
        WHERE pid = promo_id;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateCoupon(
        group_id     TEXT,
        cdesc        VARCHAR(255),
        expdate      TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE CouponGroups
        SET description = cdesc,
            expiry_date = expdate
        WHERE coupon_group_id = group_id;

    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addManagerPromo(
        promo_id     TEXT,
        pdesc        TEXT,
        startd       TIMESTAMP,
        enddate      TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO Promotions(pid, promotype, res_id, description, start_day, end_day)
        VALUES(promo_id, 'FDS', NULL, pdesc, startd, enddate);
    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addCoupon(
        group_id      TEXT,
        cdesc         VARCHAR(255),
        expdate       TIMESTAMP,
        target_cust   TEXT,
        cust_activity INTEGER
    ) AS $$

    DECLARE
        last_active TIMESTAMP := (Now() - make_interval(months := CAST(cust_activity AS INTEGER)));

    BEGIN
        CREATE TEMP TABLE targets (target_id VARCHAR(255));
        CREATE TEMP TABLE setParams (coupon_group_no TEXT, is_coupon_used BOOLEAN);

        IF target_cust = 'inactive' THEN
            INSERT INTO targets(target_id) SELECT cust_id FROM inactiveCustomers(last_active);
        ELSE
            INSERT INTO targets(target_id) SELECT cust_id FROM activeCustomers(last_active);
        END IF;

        INSERT INTO CouponGroups(coupon_group_id, description, expiry_date)
        VALUES(group_id, cdesc, expdate);

        INSERT INTO setParams(coupon_group_no,is_coupon_used) VALUES (group_id, false);

        INSERT INTO Coupons(coupon_group_id, usr_id, is_used)
        SELECT coupon_group_no, target_id, is_coupon_used
        FROM targets CROSS JOIN setParams;

    END
$$ LANGUAGE plpgsql;
