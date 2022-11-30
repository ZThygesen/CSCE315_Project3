const express = require("express");
const router = express.Router();
const conn = require("../db");

/**
 * 
 * @param {*} num 
 * @returns num < 10 ? "0" : "") + num
 */
function pad(num) {
    return (num < 10 ? "0" : "") + num;
}

/**
 * Retrieves sales report query information from database
 * and calculates total profit given a price range.
 */
router.post("/", async (req, res) => {
    const startDate = new Date(req.body.start);
    const endDate = new Date(req.body.end);

    const start = `'${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}-${pad(startDate.getDate())}'`;
    const end = `'${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}'`;

    const queries = [
        { query: 'SELECT inventory.product_name, COUNT(*) AS total_servings FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id = order_product.order_id AND orders.order_date BETWEEN $1 AND $2 GROUP BY inventory.product_name, order_product.product_id', values: [start, end] },
        { query: 'SELECT SUM(total_price) from orders WHERE order_date BETWEEN $1 AND $2', values: [start, end] }
    ];
    console.log(queries);
    const sql = conn.pgp.helpers.concat(queries);
    const [items, Total] = await conn.db.multi(sql);
    console.log(items, Total);

    res.json({ 
        items: items,
        Total: Total
    });
});

module.exports = router;