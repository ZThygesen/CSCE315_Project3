const express = require("express");
const router = express.Router();
const conn = require("../db");

router.get("/", async (req, res) => {
    const query = "SELECT * FROM teammembers";

    const teammembers = await conn.db.query(query);
    
    res.json({ teammembers: teammembers });
});

module.exports = router;
