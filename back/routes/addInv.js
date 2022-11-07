const express = require("express");
const router = express.Router();
const conn = require("../db");
//const crypto = require('crypto');

router.post("/", async (req, res) => {
    console.log(req.body);

    //const temp = crypto.randomUUID();
    var id = "test";

    const query = "INSERT INTO inventory (product_id, product_name, product_type, total_quantity, serving_size, min_quantity) VALUES (" + 
        "'" + req.body.id + "', '" + req.body.name + "', '" + req.body.type + "', " + req.body.quantity + ", " + req.body.serve + ", " + req.body.onhand + ")";

    console.log(query);

    await conn.db.query(query);

    //res.json({ success: 1 });
});

module.exports = router;