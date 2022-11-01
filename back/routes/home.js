const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/", (req, res) => {
    teammembers = [];
    pool
        .query("SELECT * FROM teammembers;")
        .then(query_res => {
            for (let i = 0; i < query_res.rowCount; i++) {
                teammembers.push(query_res.rows[i]);
            }
            console.log(teammembers);
            res.json({ teammembers: teammembers });
        });
});

module.exports = router;
