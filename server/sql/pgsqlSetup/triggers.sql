
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

--
CREATE OR REPLACE FUNCTION checkInsertCartItem() RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1 
        FROM cartitems
        WHERE usr_id = NEW.usr_id) THEN
        RAISE EXCEPTION 'user has a cart';
    END IF;

    IF EXISTS (
        SELECT 1 
        FROM cartitems
        WHERE usr_id = NEW.usr_id
        and food_id = NEW.food_id) THEN
        RAISE EXCEPTION 'user has the item in the cart';
    END IF;

    IF new.food_id 
        NOT IN(SELECT food_id FROM MenuItems WHERE new.res_id = res_id)
        THEN RAISE EXCEPTION 'The food is from different restaurant';
    END IF;
    RETURN NEW;
    END
    --check for rest
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS checkInsertCartItem ON Users;
CREATE TRIGGER checkInsertCartItem
    BEFORE UPDATE OR INSERT ON cartitems
    FOR EACH ROW
    EXECUTE FUNCTION checkInsertCartItem();


CREATE OR REPLACE FUNCTION insertNonExistentFoodCategory()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NEW.category NOT IN (SELECT category FROM FoodCategories) THEN
            INSERT INTO FoodCategories(category) VALUES(NEW.category);
        END IF;
        RETURN NEW;
    END;
$$ LANGUAGE plpgsql;
DROP TRIGGER IF EXISTS defaultFoodCategoryAlwaysPresent ON FoodItems;
CREATE TRIGGER defaultFoodCategoryAlwaysPresent
    BEFORE INSERT OR UPDATE ON FoodItems
    FOR EACH ROW
    EXECUTE PROCEDURE insertNonExistentFoodCategory();

CREATE OR REPLACE FUNCTION maintainFoodCategories()
    RETURNS TRIGGER AS $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM FoodItems I WHERE I.category = OLD.category) THEN
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


