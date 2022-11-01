const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.json([
        {
            firstName: "Ardian",
            lastName: "Kuswanto",
            gpa: "4.0",
        },
        {
            firstName: "Justin",
            lastName: "Heger",
            gpa: "6.9",
        },
        {
            firstName: "Zach",
            lastName: "Thygesen",
            gpa: "-4.0"
        },
    ]);
});

module.exports = router;
