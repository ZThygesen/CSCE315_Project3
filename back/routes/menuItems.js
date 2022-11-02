const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/", (req, res) => {
    menuItems = [];
 
    pool
        .query("SELECT item_id, item_name, price FROM menu;")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                menuItems.push(query_res.rows[i]);
            }
            res.json({ menuItems: menuItems });
        });
});

module.exports = router;
