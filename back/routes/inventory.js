const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/", (req, res) => {
    inventory = [];
    pool
        .query("SELECT * FROM inventory;")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                inventory.push(query_res.rows[i]);
            }
            console.log(inventory);
            res.json({ inventory: inventory });
        });
});

module.exports = router;
