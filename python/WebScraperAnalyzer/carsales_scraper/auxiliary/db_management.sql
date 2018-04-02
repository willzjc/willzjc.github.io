-- -- Gets distinct
-- select distinct (id) from cars;
--
-- -- Gets all row with 1 ID
-- select min(id) from cars group by id;


-- -- -- Gets count again
-- -- select count(*) from cars;
--
--
-- insert into cars(
--       'index',
--       row_count,
--       id,
--       title,
--       link,
--       make,
--       model,
--       series,
--       transmission,
--       price,
--       milage,
--       age,
--       age_rating,
--       milage_rating,
--       price_rating,
--       sum_rating,
--       market_price,
--       price_difference
-- ) select 'index', row_count, id, title, link, make, model, series, transmission, price, milage,
--   age, age_rating, milage_rating, price_rating, sum_rating, market_price, price_difference from cars;
--
--
-- select 'index', row_count, id, title, link, make, model, series, transmission, price, milage,
--   age, age_rating, milage_rating, price_rating, sum_rating, market_price, price_difference from cars;

-- Deletes Duplicates
-- DELETE FROM cars WHERE rowid NOT IN (SELECT min(rowid) FROM cars GROUP BY id);
DELETE FROM cars WHERE rowid NOT IN (SELECT min(rowid) FROM cars GROUP BY id);
select * from cars;