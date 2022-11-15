const express = require("express");
const router = express.Router();
const conn = require("../db");

router.get("/", async(req, res) => {
    const query = "SELECT inventory.product_name, COUNT(*) AS total_servings, inventory.total_quantity," + 
    "inventory.serving_size FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id = " +
    "order_product.order_id AND orders.order_date BETWEEN '" + "2022-10-05" + "' AND '" + "2022-10-24" + 
    "' GROUP BY inventory.product_name, inventory.total_quantity, inventory.serving_size";
    const excessReport = await conn.db.query(query);
    console.log(excessReport);
    res.json({ excessReport: excessReport });
});

module.exports = router;


