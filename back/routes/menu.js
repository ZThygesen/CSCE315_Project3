const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/", (req, res) => {
    menu = [];
    pool
        .query("SELECT * FROM menu;")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                menu.push(query_res.rows[i]);
            }
            res.json({ menu: menu });
        });
});

module.exports = router;
