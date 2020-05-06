
CREATE OR REPLACE FUNCTION checkInsertUser() RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM users
        WHERE username = NEW.username) THEN
        RAISE EXCEPTION 'username in used';
    -- ELSIF EXISTS(
    --     SELECT 1 
    --     FROM users
    --     where usr_id = NEW.usr_id) THEN
    --     RAISE EXCEPTION 'usr_id in used';
    END IF;
    
    RETURN NEW;
    END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS checkInsertUser ON Users;
CREATE TRIGGER checkInsertUser
    BEFORE  UPDATE OF usr_id, username OR INSERT ON Users
    FOR EACH ROW
    EXECUTE FUNCTION checkInsertUser();

--CUSTOMER
CREATE OR REPLACE FUNCTION checkInsertCartItem() RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM cartitems
        WHERE usr_id = NEW.usr_id
        and food_id = NEW.food_id) THEN
        UPDATE cartitems 
        SET qty = NEW.qty
        WHERE usr_id = NEW.usr_id AND food_id = NEW.food_id;
        RETURN NULL;
    END IF;

    IF new.res_id 
        NOT IN (
            SELECT DISTINCT res_id
            FROM cartitems
            WHERE new.usr_id = usr_id
        ) 
        AND 
        EXISTS (
            SELECT 1
            FROM cartitems
            WHERE usr_id = new.usr_id
        )
         THEN RAISE EXCEPTION 'You have food from different restaurant, clear your cart if you want to order from other restaurants!';
    END IF;
    IF new.food_id 
        NOT IN(SELECT food_id FROM MenuItems WHERE new.res_id = res_id)
        THEN RAISE EXCEPTION 'The food is from different restaurant';
    END IF;
    RETURN NEW;
    END
    --check for rest
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS checkInsertCartItem ON cartitems;
CREATE TRIGGER checkInsertCartItem
    BEFORE INSERT OR UPDATE OF food_id, usr_id ON cartitems
    FOR EACH ROW
    EXECUTE FUNCTION checkInsertCartItem();

CREATE OR REPLACE FUNCTION checkCartItem() RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM cartitems where qty=0;
    RETURN NULL;
    END
    --check for rest
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS checkCartItem ON cartitems;
CREATE TRIGGER checkCartItem
    AFTER INSERT OR UPDATE OF qty ON cartitems
    FOR EACH ROW
    EXECUTE FUNCTION checkCartItem();


--RESTAURANT
CREATE OR REPLACE FUNCTION insertNonExistentFoodCategory()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.category NOT IN (SELECT category FROM FoodCategories) THEN
            INSERT INTO FoodCategories(category) VALUES(NEW.category);
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS foodCategoryAlwaysPresent ON FoodItems;
CREATE TRIGGER foodCategoryAlwaysPresent
    BEFORE INSERT OR UPDATE ON FoodItems
    FOR EACH ROW
    EXECUTE PROCEDURE insertNonExistentFoodCategory();

CREATE OR REPLACE FUNCTION maintainFoodCategories()
    RETURNS TRIGGER AS $$
    BEGIN
        IF OLD.category <> 'Others' AND NOT EXISTS (SELECT 1 FROM FoodItems I WHERE I.category = OLD.category) THEN
            DELETE FROM FoodCategories
            WHERE category = OLD.category;
        END IF;
        RETURN OLD;
    END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS keepOnlyNonEmptyFoodCategories ON FoodItems;
CREATE TRIGGER keepOnlyNonEmptyFoodCategories
    AFTER UPDATE OR DELETE ON FoodItems
    FOR EACH ROW
        EXECUTE PROCEDURE maintainFoodCategories();