const express = require("express");
const router = express.Router();
const conn = require("../db");


router.post("/", async (req, res) => {
    const query = "DELETE FROM inventory WHERE product_id = '" + req.body.id + "'";

    await conn.db.query(query);
});

module.exports = router;
