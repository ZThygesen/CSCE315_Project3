const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/", (req, res) => {
    inventoryItems = [];

    const query1 = pool
        .query("SELECT product_id, product_name, product_type FROM inventory;")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                inventoryItems.push(query_res.rows[i]);
            }
            res.json({ inventoryItems: inventoryItems });
        });
    
    
});

module.exports = router;
