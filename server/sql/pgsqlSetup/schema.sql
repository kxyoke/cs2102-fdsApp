DROP TABLE IF EXISTS Users CASCADE; 
DROP TABLE IF EXISTS Restaurants CASCADE;
DROP TABLE IF EXISTS MenuItems CASCADE;
DROP TABLE IF EXISTS MenuItemsSold CASCADE;
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
DROP TABLE IF EXISTS CouponGroups CASCADE;
DROP TABLE IF EXISTS Coupons CASCADE;
DROP TABLE IF EXISTS Wws CASCADE;
DROP TABLE IF EXISTS Mws CASCADE;
DROP TABLE IF EXISTS Reviews CASCADE;
DROP TABLE IF EXISTS CartItems CASCADE;

CREATE TABLE Restaurants (
    res_id           TEXT PRIMARY KEY,
    rname            TEXT UNIQUE NOT NULL,
    address          TEXT NOT NULL,
    postal_code      TEXT CHECK (postal_code SIMILAR TO '[0-9]{6}'),
    min_amount       NUMERIC NOT NULL,
    password_digest      VARCHAR(255) NOT NULL DEFAULT '$2b$10$bfU45HrpdNwgzn5Gfhv96.Xw8/Nbl857GVARB3.bK8VwMoZa0lj22' --'default'
);

/* restrict in-app deletion of categories? */
CREATE TABLE FoodCategories (
    category        TEXT PRIMARY KEY
);

CREATE TABLE MenuItems (
    res_id              TEXT,
    food_id             TEXT,
    name                TEXT,
    description         TEXT,
    imagepath           TEXT DEFAULT 'https://react.semantic-ui.com/images/wireframe/image.png',
    category            TEXT NOT NULL DEFAULT '???',
    price               NUMERIC,
    daily_limit         INTEGER DEFAULT 20,
    available           BOOLEAN DEFAULT true,
    PRIMARY KEY (res_Id, food_id),
    FOREIGN KEY (res_id) REFERENCES Restaurants,
    FOREIGN KEY (category) REFERENCES FoodCategories ON DELETE SET DEFAULT
);

CREATE TABLE MenuItemsSold (
    res_id          TEXT,
    food_id         TEXT,
    day             DATE DEFAULT current_date,
    num_sold        INTEGER DEFAULT 0 CHECK(num_sold >= 0),
    PRIMARY KEY (res_id, food_id, day),
    FOREIGN KEY (res_id, food_id) REFERENCES MenuItems
); --and add trigger so num_sold <= daily_limit.


CREATE TABLE Users (
    usr_id               VARCHAR(255) PRIMARY KEY,
    userName             VARCHAR(255) NOT NULL UNIQUE,
    password_digest      VARCHAR(255) NOT NULL 
);

CREATE TABLE FdsManagers (
    usr_id        VARCHAR(255) NOT NULL PRIMARY KEY,
    FOREIGN KEY (usr_id) REFERENCES Users ON DELETE CASCADE
);

CREATE TABLE RestaurantStaffs ( -- note 1 res only 1 manager typically
    usr_id         VARCHAR(255) NOT NULL,
    res_id         TEXT NOT NULL,
    is_manager     BOOLEAN NOT NULL,
    PRIMARY KEY(usr_id),
    FOREIGN KEY (usr_id) REFERENCES Users ON DELETE CASCADE,
    FOREIGN KEY (res_id) REFERENCES Restaurants ON DELETE CASCADE
);

CREATE TABLE Customers (
    usr_id               VARCHAR(255) NOT NULL,
    card_num             INTEGER,
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
    postal_code      TEXT CHECK (postal_code SIMILAR TO '[0-9]{6}'),
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
    FOREIGN KEY (usr_id) REFERENCES Users ON DELETE CASCADE,
    FOREIGN Key (res_id, food_id) REFERENCES MenuItems
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
    destination_address        TEXT NOT NULL,
    postal_code      TEXT CHECK (postal_code SIMILAR TO '[0-9]{6}'),
    payment        VARCHAR(255) NOT NULL 
                                CHECK (payment IN ('card', 'cash')),
    listOfItems    OrderItem[] NOT NULL,
    status         VARCHAR(20) NOT NULL DEFAULT 'pending'
                             CHECK (status in('pending', 'in progress', 'complete')),
    is_prepared     BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY(usr_id) REFERENCES Customers ON DELETE CASCADE,
    FOREIGN KEY(res_id) REFERENCES Restaurants
);

CREATE TABLE Reviews (
    order_id        TEXT PRIMARY KEY,
    food_rev        TEXT,
    delivery_rating NUMERIC CHECK(delivery_rating >0 AND delivery_rating<=5),
    FOREIGN KEY(order_id) REFERENCES Orders
);

CREATE TABLE Deliveries (
    order_id          TEXT PRIMARY KEY,
    delivery_fee      NUMERIC DEFAULT 3,
    usr_id            VARCHAR(255) DEFAULT NULL,
    place_order_time  TIMESTAMP NOT NULL,
    dr_leave_for_res  TIMESTAMP,
    dr_arrive_res     TIMESTAMP,
    dr_leave_res      TIMESTAMP,
    dr_arrive_cus     TIMESTAMP,
    FOREIGN KEY(order_id) REFERENCES Orders ON DELETE CASCADE,
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
        OR description SIMILAR TO 'DEFAULT:(absolute|percent);([1-9]*[0-9]+(\.[0-9]{0,2})?);([1-9]*[0-9]+(\.[0-9]{0,2})?)'
    )
);

CREATE TABLE CouponGroups (
    coupon_group_id  TEXT PRIMARY KEY,
    description      VARCHAR(255) NOT NULL,
    expiry_date      TIMESTAMP
);

CREATE TABLE Coupons (
    coupon_id        TEXT PRIMARY KEY,
    coupon_group_id  TEXT NOT NULL,
    usr_id           VARCHAR(255) NOT NULL,
    is_used          BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (coupon_group_id) REFERENCES Coupons,
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
