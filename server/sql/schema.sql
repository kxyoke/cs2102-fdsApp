DROP TABLE IF EXISTES Users CASCADE; 
DROP TABLE IF EXISTES Restaurants CASCADE;
DROP TABLE IF EXISTES RestaurantStaffs CASCADE;
DROP TABLE IF EXISTES Customers CASCADE;
DROP TABLE IF EXISTES Customers_address CASCADE;
DROP TABLE IF EXISTES FdsManagers CASCADE;
DROP TABLE IF EXISTES Riders CASCADE;
DROP TABLE IF EXISTES Orders CASCADE;
DROP TABLE IF EXISTES Deliveries CASCADE;
DROP TABLE IF EXISTES Promotions CASCADE;
DROP TABLE IF EXISTES Coupons CASCADE;
DROP TABLE IF EXISTES Wws CASCADE;
DROP TABLE IF EXISTES Mws CASCADE;

CREATE TABLE Restaurants {
    res_id           VARCHAR(255) PRIMARY KEY,
    address       VARCHAR(255) NOT NULL,
    rname         VARCHAR(255) NOT NULL,
    min_amout     INTEGER NOT NULL,

}
CREATE TABLE Users (
    usr_id               VARCHAR(255) NOT NULL,,
    userName          VARCHAR(255) NOT NULL,
    email             VARCHAR(255) NOT NULL,
    password_digest   VARCHAR(255) NOT NULL,
);

CREATE TABLE RestaurantStaffs {
    usr_id         VARCHAR(255) NOT NULL,
    res_id         VARCHAR(255) NOT NULL,
    PRIMARY KEY(usr_id),
    FOREIGN KEY (usr_id) REFERENCES Users,
    FOREIGN KEY (res_id) REFERENCES Restaurants,
};

CREATE TABLE Customers {
    usr_id               VARCHAR(255) NOT NULL,
    card_num          INTEGER(16),
    last_order_time   TIMESTAMP DEFAULT NULL,
    PRIMARY KEY(usr_id)
    FOREIGN KEY (usr_id) REFERENCES Users
};

--Keep track of customers recent address at most 5 per customer
--If the address is alr in the table, update the time,
--display of address based on the last use time
--on update, delete the olders address and add the new address
CREATE TABLE Customers_address {
    usr_id          VARCHAR(255) NOT NULL,
    address         VARCHAR(255) NOT NULL,
    last_use_time   TIMESTAMP NOT NULL,
    PRIMARY KEY(usr_id, address),
    FOREIGN KEY (usr_id) REFERENCES Customers
};

CREATE TABLE FdsManagers {
    usr_id        VARCHAR(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (usr_id) REFERENCES Users
};

CREATE TABLE Riders {
    usr_id        VARCHAR(255) NOT NULL PRIMARY KEY,

    FOREIGN KEY (usr_id) REFERENCES Users
};

CREATE TABLE Fulltimerider {
    usr_id         VARCHAR(255) NOT NULL PRIMARY KEY,
    base_salary    INTEGER NOT NULL,
    FOREIGN KEY (usr_id) REFERENCES Riders
};

CREATE TABLE Parttimerider {
    usr_id         VARCHAR(255) NOT NULL PRIMARY KEY,
    base_salary    INTEGER NOT NULL,
    FOREIGN KEY (usr_id) REFERENCES Riders
}

CREATE TABLE Orders {
    order_id       VARCHAR(255) PRIMARY KEY,
    usr_id         VARCHAR(255) NOT NULL,
    res_id         VARCHAR(255) NOT NULL,
    isCheckedOut   BOOLEAN,
    payment        VARCHAR(255) NOT NULL,
    listOfItems    VARCHAR(255) NOT NULL,
    status         VARCHAR(20) NOT NULL,
    FOREIGN KEY(usr_id) REFERENCES Customers,
    FOREIGN KEY(res_id) REFERENCES Restaurants
    

};

CREATE TABLE Payments {
    payment    VARCHAR(255) PRIMARY KEY
}

CREATE TABLE Deliveries {
    order_id         VARCHAR(255) PRIMARY KEY,
    usr_id           VARCHAR(255) NOT NULL,
    place_order_time  TIMESTAMP NOT NULL,
    dr_leave_for_res  TIMESTAMP,
    dr_arrive_res     TIMESTAMP,
    dr_leave_res      TIMESTAMP,
    dr_arrive_ucs     TIMESTAMP
    FOREIGN KEY(order_id) REFERENCES Orders,
    FOREIGN KEY(usr_id) REFERENCES Riders
};

CREATE TABLE Promotions {
    pid      VARCHAR(255) PRIMARY KEY,
    type     VARCHAR(255) NOT NULL,
    disc     VARCHAR(255) NOT NULL,
    start_day  TIMESTAMP NOT NULL,
    end_time    TIMESTAMP NOT NULL
};


CREATE TABLE Coupons {
    coupon_id     VARCHAR(255) PRIMARY KEY,
    usr_id        VARCHAR(255),
    disc            VARCHAR(255) NOT NULL,
    expiry_date     TIMESTAMP,
    FOREIGN KEY (usr_id) REFERENCES Customers
};

--need to check
CREATE TABLE Wws {
    usr_id       VARCHAR(255) NOT NULL,
    day          INTEGER(2) NOT NULL,
    month        INTEGER(2) NOT NULL,
    year         INTEGER(4) NOT NULL,
    start_time   TIMESTAMP NOT NULL,
    end_time     TIMESTAMP NOT NULL,
    PRIMARY KEY(usr_id, day, month, year),
    FOREIGN KEY(usr_id) REFERENCES Parttimerider
};

--for full time rider
CREATE TABLE Shifts {
    shift_id    INTEGER(1) PRIMARY KEY,
    start_time1 TIMESTAMP NOT NULL,
    start_time2 TIMESTAMP NOT NULL,
    end_time1 TIMESTAMP NOT NULL,
    end_time2 TIMESTAMP NOT NULL
}
--need to check
CREATE TABLE Mws {
    usr_id       VARCHAR(255) NOT NULL,
    day          INTEGER(2) NOT NULL,
    month        INTEGER(2) NOT NULL,
    year         INTEGER(4) NOT NULL,
    shift_id     INTEGER(1) NOT NULL,
    PRIMARY KEY(usr_id, day, month, year),
    FOREIGN KEY(shift_id) REFERENCES Shifts,
    FOREIGN KEY(usr_id) REFERENCES Fulltimerider

};