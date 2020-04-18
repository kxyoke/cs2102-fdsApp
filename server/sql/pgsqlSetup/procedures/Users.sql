CREATE OR REPLACE PROCEDURE 
    addCustomer(usr_id VARCHAR(255)
                ,username VARCHAR(255),
                 password VARCHAR(255)) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Customers(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addResStaff(res_id TEXT,
                                        usr_id VARCHAR(255),
                                        username VARCHAR(255),
                                        password VARCHAR(255), 
                                        resname TEXT,
                                        address TEXT, 
                                        minamt NUMERIC
                                         ) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Restaurants(res_id, rname, address, min_amount) VALUES (res_id,resname, address, minamt);
    INSERT INTO RestaurantStaffs(res_id, usr_id) VALUES (res_id, usr_id);
    
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addFullTimeRider(usr_id VARCHAR(255),
                                        username VARCHAR(255),
                                         password VARCHAR(255)
                                         ) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Riders(usr_id) VALUES (usr_id);
    INSERT INTO Fulltimerider(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addPartTimeRider(usr_id VARCHAR(255),
                                        username VARCHAR(255),
                                         password VARCHAR(255)
                                         ) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Riders(usr_id) VALUES (usr_id);
    INSERT INTO Parttimerider(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE updateUsername(u_id VARCHAR(255),
                                            newUsername VARCHAR(255))
    AS $$
BEGIN
    UPDATE Users
    SET username = newUsername
    WHERE usr_id = u_id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE updatePassword(u_id VARCHAR(255),
                                            password VARCHAR(255))
    AS $$
BEGIN 
    UPDATE Users
    SET password_digest = password
    WHERE usr_id = u_id;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE PROCEDURE deleteAccount(u_id VARCHAR(255)) AS $$
BEGIN
    DELETE FROM Users
    WHERE usr_id = u_id;
END;
$$ LANGUAGE plpgsql;

