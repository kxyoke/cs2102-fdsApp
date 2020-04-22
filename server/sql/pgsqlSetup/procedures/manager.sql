CREATE OR REPLACE PROCEDURE
    updateManagerPassword(
        mid      VARCHAR(255),
        pword    VARCHAR(255)
    ) AS $$

    BEGIN
        UPDATE Promotions
        SET passwrord_digest = pword
        WHERE usr_id = mid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateManagerPromo(
        pid     TEXT,
        ptype   VARCHAR(255),
        pdesc   TEXT,
        startd  TIMESTAMP,
        endd    TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE Promotions
        SET promotype = ptype,
            description = pdesc,
            start_day = startd,
            end_day = endd
        WHERE pid = pid;
    END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    updateCoupon(
        cid     TEXT,
        cdesc   VARCHAR(255),
        expd    TIMESTAMP
    ) AS $$

    BEGIN
        UPDATE Coupons
        SET description = cdesc,
            expiry_date = expd
        WHERE coupon_id = cid;

    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addManagerPromo(
        pid     TEXT,
        ptype   VARCHAR(255),
        pdesc   TEXT,
        startd  TIMESTAMP,
        endd    TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO Promotions(pid, promotype, res_id, description, start_day, end_day)
        VALUES(pid, 'FDS', NULL, pdesc, startd, endd);
    END
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE
    addCoupon(
        cid     TEXT,
        cdesc   VARCHAR(255),
        expd    TIMESTAMP
    ) AS $$

    BEGIN
        INSERT INTO Coupons(coupon_id, usr_id, description, expiry_date)
        VALUES(cid, NULL, cdesc, expd);
    END
$$ LANGUAGE plpgsql;
