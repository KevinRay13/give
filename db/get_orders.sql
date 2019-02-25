SELECT date, products_ordered, username
FROM orders
    JOIN giver g
    ON g.id = orders.user_id