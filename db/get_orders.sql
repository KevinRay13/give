SELECT date, products_ordered, username, Total
FROM orders
    JOIN giver g
    ON g.id = orders.user_id