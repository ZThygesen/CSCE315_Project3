const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async (req, res) => {
    const query = "INSERT INTO menu (product_id, product_name, price, calories, product_type) VALUES (" + 
        "'" + req.body.id + "', '" + req.body.name + "', " + req.body.price + ", '" + req.body.cal + "', '" + req.body.type + "')";

    await conn.db.query(query);

    res.json("Item added successfully!");
});

module.exports = router;
