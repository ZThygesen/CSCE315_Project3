const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async(req, res) => {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate; 
    
    const query = `SELECT inventory.product_name, COUNT(*) AS total_servings FROM inventory, order_product, orders
        WHERE inventory.product_id = order_product.product_id AND orders.order_id = order_product.order_id AND orders.order_date BETWEEN
        '${startDate}' AND '${endDate}' GROUP BY inventory.product_name, order_product.product_id`;
    
    items = await conn.db.query(query);
    
    res.json({ items: items});
});

module.exports = router;
