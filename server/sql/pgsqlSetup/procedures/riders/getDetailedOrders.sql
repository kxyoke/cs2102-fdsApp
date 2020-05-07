DROP FUNCTION IF EXISTS getDetailedOrders(text,text);

CREATE OR REPLACE FUNCTION getDetailedOrders(res_id text, rest text) RETURNS TEXT[] AS $$
DECLARE
    listOfItems text[] := regexp_split_to_array($2, ',');
    arrayToReturn text[] := array[]::text[];
BEGIN
    select * into arrayToReturn from MenuItems where MenuItems.res_id = $1 ;
    RETURN arrayToReturn;
END;
$$ LANGUAGE plpgsql;





