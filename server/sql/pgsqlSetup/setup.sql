\i ./schema.sql

INSERT INTO FoodCategories(category) VALUES ('Others');

\i ./views.sql

\i ./function.sql
\i ./procedures/Users.sql
\i ./triggers.sql
\i ./init.sql
\i ./procedures/customer.sql

\i ./procedures/restaurantAdd.sql
\i ./procedures/restaurantDelete.sql
\i ./procedures/restaurantUpdate.sql
\i ./procedures/riders/editFRiderSchedule.sql
\i ./procedures/riders/getDetailedOrders.sql
\i ./procedures/riders/checkIfRiderDriving.sql
\i ./procedures/riders/updateDeliveryTime.sql
\i ./procedures/riders/getFilteredDeliveries.sql
\i ./procedures/riders/editPTRiderSchedule.sql
\i ./procedures/riders/getFilteredWorkingHours.sql
\i ./procedures/riders/getRiderSalary.sql
\i ./procedures/riders/getCurrentSchedule.sql