CREATE OR REPLACE PROCEDURE addCustomer(usr_id VARCHAR(255),username VARCHAR(255), password VARCHAR(255)) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Customers(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addResStaff(usr_id VARCHAR(255),
                                        username VARCHAR(255),
                                         password VARCHAR(255)) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO RestaurantStaffs(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addFullTimeRider(usr_id VARCHAR(255),
                                        username VARCHAR(255),
                                         password VARCHAR(255),
                                         ) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Riders(usr_id) VALUES (usr_id);
    INSERT INTO Fulltimerider(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addPartTimeRider(usr_id VARCHAR(255),
                                        username VARCHAR(255),
                                         password VARCHAR(255),
                                         ) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Riders(usr_id) VALUES (usr_id);
    INSERT INTO Parttimerider(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

