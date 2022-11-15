const express = require("express");
const router = express.Router();
const conn = require("../db");

router.get("/", async(req, res) => {
    var start = "2022-10-16";
    var end = "2022-12-05"; 
    console.log(req.body.start + req.body.end);
    const query = "SELECT inventory.product_name, COUNT(*) AS total_servings, inventory.total_quantity," + 
    "inventory.serving_size FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id = " +
    "order_product.order_id AND orders.order_date BETWEEN '" + start + "' AND '" + end + 
    "' GROUP BY inventory.product_name, inventory.total_quantity, inventory.serving_size";
    excessReport = await conn.db.query(query);
    
    res.json({ excessReport: excessReport });
});

module.exports = router;


