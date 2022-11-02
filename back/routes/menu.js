const express = require("express");
const router = express.Router();
const conn = require("../db");

router.get("/", async(req, res) => {
    const query = "SELECT * FROM menu";

    const menu = await conn.db.query(query);

    res.json({ menu: menu });
});

module.exports = router;
