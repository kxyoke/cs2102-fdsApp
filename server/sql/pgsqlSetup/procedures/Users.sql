
CREATE OR REPLACE PROCEDURE 
    addCustomer(usr_id VARCHAR(255)
                ,username VARCHAR(255),
                 password VARCHAR(255)) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(usr_id, username, password);
    INSERT INTO Customers(usr_id) VALUES (usr_id);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addResStaffAndRes(
                                        _res_id TEXT,
                                        _usr_id VARCHAR(255),
                                        _username VARCHAR(255),
                                        _password VARCHAR(255), 
                                        _resname TEXT,
                                        _address TEXT, 
                                        _minamt NUMERIC,
                                        _res_pwd VARCHAR(255)
                                         ) AS $$
BEGIN
    INSERT INTO Restaurants(res_id, rname, address, min_amount, password_digest) VALUES (_res_id,_resname, _address, _minamt, _res_pwd);
    
    INSERT INTO Users (usr_id, username, password_digest) VALUES(_usr_id, _username, _password);
    INSERT INTO RestaurantStaffs(res_id, usr_id, is_manager) VALUES (_res_id, _usr_id, TRUE);
    
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE PROCEDURE addResStaffOnly(
                                        _res_id TEXT,
                                        _usr_id VARCHAR(255),
                                        _username VARCHAR(255),
                                        _password VARCHAR(255) 
                                         ) AS $$
BEGIN
    INSERT INTO Users (usr_id, username, password_digest) VALUES(_usr_id, _username, _password);
    INSERT INTO RestaurantStaffs(res_id, usr_id, is_manager) VALUES (_res_id, _usr_id, FALSE);
    
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



