DROP TABLE IF EXISTS Users CASCADE; 
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS MenuItems CASCADE;
DROP TABLE IF EXISTS FoodItems CASCADE;
DROP TABLE IF EXISTS FoodCategories CASCADE;
DROP TABLE IF EXISTS RestaurantStaffs CASCADE;
DROP TABLE IF EXISTS Customers CASCADE;
DROP TABLE IF EXISTS Customers_address CASCADE;
DROP TABLE IF EXISTS FdsManagers CASCADE;
DROP TABLE IF EXISTS fulltimerider CASCADE;
DROP TABLE IF EXISTS Parttimerider CASCADE;
DROP TABLE IF EXISTS Riders CASCADE;
DROP TABLE IF EXISTS Shifts CASCADE;
DROP TABLE IF EXISTS Orders CASCADE;
DROP TYPE IF EXISTS OrderItem CASCADE;
DROP TABLE IF EXISTS Deliveries CASCADE;
DROP TABLE IF EXISTS Promotions CASCADE;
DROP TABLE IF EXISTS Coupons CASCADE;
DROP TABLE IF EXISTS Wws CASCADE;
DROP TABLE IF EXISTS Mws CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS CartItems CASCADE;

CREATE TABLE Restaurants (
    res_id           TEXT PRIMARY KEY,
    rname            TEXT NOT NULL,
    address          TEXT NOT NULL,
    min_amount       NUMERIC NOT NULL
);

/* restrict in-app deletion of categories? */
CREATE TABLE FoodCategories (
    category        TEXT PRIMARY KEY
);

CREATE TABLE FoodItems (
    food_id            TEXT PRIMARY KEY,
    name               TEXT,
    description        TEXT,
    imagepath          TEXT DEFAULT 'https://react.semantic-ui.com/images/wireframe/image.png',
    category           TEXT NOT NULL DEFAULT 'unknown',
    FOREIGN KEY (category) REFERENCES FoodCategories 
    -- NO ACTION ON CASCADE?
);

CREATE TABLE MenuItems (
    res_id      TEXT NOT NULL,
    food_id     TEXT PRIMARY KEY,
    price       NUMERIC,
    daily_limit INTEGER DEFAULT 20,
    daily_sells INTEGER DEFAULT 0,
    --
    available  BOOLEAN DEFAULT true,
    FOREIGN KEY (res_id) REFERENCES Restaurants,
    FOREIGN KEY (food_id) REFERENCES FoodItems ON DELETE CASCADE
);



CREATE TABLE Users (
    usr_id               VARCHAR(255) PRIMARY KEY,
    userName             VARCHAR(255) NOT NULL UNIQUE,
    password_digest      VARCHAR(255) NOT NULL 
);

CREATE TABLE FdsManagers (
    usr_id        VARCHAR(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (usr_id) REFERENCES Users ON DELETE CASCADE
);

CREATE TABLE RestaurantStaffs (
    usr_id         VARCHAR(255) NOT NULL,
    res_id         TEXT,
    PRIMARY KEY(usr_id),
    FOREIGN KEY (usr_id) REFERENCES Users ON DELETE CASCADE,
    FOREIGN KEY (res_id) REFERENCES Restaurants 
);

CREATE TABLE Customers (
    usr_id               VARCHAR(255) NOT NULL,
    card_num             INTEGER,
    last_order_time      TIMESTAMP DEFAULT NULL,
    reward_points        INTEGER DEFAULT 0 CHECK(reward_points >= 0),
    PRIMARY KEY(usr_id),
    FOREIGN KEY (usr_id) REFERENCES Users ON DELETE CASCADE
);

--Keep track of customers recent address at most 5 per customer
--If the address is alr in the table, update the time,
--display of address based on the last use time
--on update, delete the olders address and add the new address
CREATE TABLE Customers_address (
    usr_id          VARCHAR(255) NOT NULL,
    address         TEXT NOT NULL,
    last_use_time   TIMESTAMP NOT NULL,
    PRIMARY KEY(usr_id, address),
    FOREIGN KEY (usr_id) REFERENCES Customers ON DELETE CASCADE
);

CREATE TABLE CartItems (
    usr_id          VARCHAR(255),
    res_id          TEXT,
    food_id         TEXT,
    qty             INTEGER DEFAULT 0,
    PRIMARY KEY (usr_id, food_id),
    FOREIGN KEY (usr_id) REFERENCES Customers ON DELETE CASCADE,
    FOREIGN KEY (res_id) REFERENCES Restaurants,
    FOREIGN Key (food_id) REFERENCES FoodItems
);

CREATE TABLE Riders (
    usr_id        VARCHAR(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (usr_id) REFERENCES Users
);

CREATE TABLE Fulltimerider (
    usr_id         VARCHAR(255) NOT NULL PRIMARY KEY,
    base_salary    NUMERIC DEFAULT 2000,
    FOREIGN KEY (usr_id) REFERENCES Riders
);

CREATE TABLE Parttimerider (
    usr_id         VARCHAR(255) NOT NULL PRIMARY KEY,
    base_salary    NUMERIC DEFAULT 1000,
    FOREIGN KEY (usr_id) REFERENCES Riders
);

CREATE TYPE OrderItem AS (
    food_id     TEXT,
    qty        INTEGER
);

CREATE TABLE Orders (
    order_id       TEXT PRIMARY KEY,
    usr_id         VARCHAR(255) NOT NULL,
    res_id         TEXT NOT NULL,
    total          NUMERIC NOT NULL,
    isCheckedOut   BOOLEAN,
    payment        VARCHAR(255) NOT NULL 
                                CHECK (payment IN ('card', 'cash')),
    listOfItems    TEXT[][] NOT NULL,
    status         VARCHAR(20) NOT NULL 
                             CHECK (status in('pending', 'in progress', 'complete')),
    is_prepared     BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY(usr_id) REFERENCES Customers,
    FOREIGN KEY(res_id) REFERENCES Restaurants
);

CREATE TABLE Reviews (
    order_id        TEXT PRIMARY KEY,
    food_rev        TEXT,
    delivery_rating NUMERIC CHECK(delivery_rating >0 AND delivery_rating<=10),
    FOREIGN KEY(order_id) REFERENCES Orders
);

CREATE TABLE Deliveries (
    order_id          TEXT PRIMARY KEY,
    usr_id            VARCHAR(255) NOT NULL,
    place_order_time  TIMESTAMP NOT NULL,
    dr_leave_for_res  TIMESTAMP,
    dr_arrive_res     TIMESTAMP,
    dr_leave_res      TIMESTAMP,
    dr_arrive_cus     TIMESTAMP,
    FOREIGN KEY(order_id) REFERENCES Orders,
    FOREIGN KEY(usr_id) REFERENCES Riders
);

CREATE TABLE Promotions (
    pid             TEXT PRIMARY KEY,
    promotype       VARCHAR(255) NOT NULL
                            CHECK(promotype in('FDS', 'RES')),
    res_id          TEXT DEFAULT NULL,
    description     TEXT NOT NULL,
    start_day       TIMESTAMP NOT NULL,
    end_day         TIMESTAMP NOT NULL,
    FOREIGN KEY(res_id) REFERENCES Restaurants,
    CONSTRAINT res_id_notnull_if_type  CHECK (
        (promotype = 'RES' AND res_id IS NOT NULL)
        OR (promotype = 'FDS' AND res_id IS NULL)
    ),
    CONSTRAINT res_promo_default_format CHECK(
        description NOT LIKE 'DEFAULT:%'
        OR description SIMILAR TO 'DEFAULT:([1-9]*[0-9]+(\.[0-9]{0,2})?);(absolute|percent);([1-9]*[0-9]+(\.[0-9]{0,2})?)'
    )
);


CREATE TABLE Coupons (
    coupon_id       TEXT PRIMARY KEY,
    usr_id          VARCHAR(255),
    description     VARCHAR(255) NOT NULL,
    expiry_date     TIMESTAMP,
    FOREIGN KEY (usr_id) REFERENCES Customers
);

--need to check
CREATE TABLE Wws (
    usr_id      VARCHAR(255) NOT NULL,
    dayOfWeek   INTEGER NOT NULL,
    week        INTEGER NOT NULL,
    start_time  TIME NOT NULL,
    end_time    TIME NOT NULL,
    PRIMARY KEY(usr_id, dayOfWeek, week, start_time, end_time),
    FOREIGN KEY(usr_id) REFERENCES Parttimerider
);

--for full time rider
CREATE TABLE Shifts (
    shift_id    INTEGER PRIMARY KEY,
    start_time1 TIME  NOT NULL,
    start_time2 TIME  NOT NULL,
    end_time1   TIME  NOT NULL,
    end_time2   TIME NOT NULL
);

--need to check
CREATE TABLE Mws (
    usr_id       VARCHAR(255) NOT NULL,
    day          INTEGER NOT NULL,
    shift_id     INTEGER NOT NULL,
    PRIMARY KEY(usr_id, day),
    FOREIGN KEY(shift_id) REFERENCES Shifts,
    FOREIGN KEY(usr_id) REFERENCES Fulltimerider

);
