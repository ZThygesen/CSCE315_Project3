const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async (req, res) => {
    console.log(req.body);

    const query = "INSERT INTO menu (product_id, product_name, price, calories, product_type) VALUES (" + 
        "'" + req.body.id + "', '" + req.body.name + "', " + req.body.price + ", '" + req.body.cal + "', '" + req.body.type + "')";

    console.log(query);

    await conn.db.query(query);
});

module.exports = router;