const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async (req, res) => {
    const query = "INSERT INTO inventory (product_id, product_name, product_type, total_quantity, serving_size, min_quantity) VALUES (" + 
        "'" + req.body.id + "', '" + req.body.name + "', '" + req.body.type + "', " + req.body.quantity + ", " + req.body.serve + ", " + req.body.onhand + ")";

    await conn.db.query(query);

    res.json("Item added successfully!");
});

module.exports = router;
