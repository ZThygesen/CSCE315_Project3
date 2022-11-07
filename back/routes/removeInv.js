const express = require("express");
const router = express.Router();
const conn = require("../db");


router.post("/", async (req, res) => {
    console.log(req.body);

    const query = "DELETE FROM inventory WHERE product_id = '" + req.body.id + "'";
    console.log(query);

    await conn.db.query(query);
});

module.exports = router;