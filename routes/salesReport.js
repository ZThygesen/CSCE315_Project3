const express = require("express");
const router = express.Router();
const conn = require("../db");

function pad(num) {
    return (num < 10 ? "0" : "") + num;
}

router.post("/", async (req, res) => {
    const startDate = new Date(req.body.start);
    const endDate = new Date(req.body.end);

    const start = `'${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}-${pad(startDate.getDate())}'`;
    const end = `'${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}'`;

    const query = `SELECT inventory.product_name, COUNT(*) AS total_servings FROM inventory, order_product, orders
        WHERE inventory.product_id = order_product.product_id AND orders.order_id = order_product.order_id AND orders.order_date BETWEEN
        ${start} AND ${end} GROUP BY inventory.product_name, order_product.product_id`;
    
    items = await conn.db.query(query);

    res.json({ items: items});
});

module.exports = router;
