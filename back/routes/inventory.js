const express = require("express");
const router = express.Router();
const conn = require("../db");

router.get("/", async (req, res) => {
    const query = "SELECT * FROM inventory";

    const inventory = await conn.db.query(query);

    res.json({ inventory: inventory });
});

module.exports = router;
