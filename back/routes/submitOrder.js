const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async (req, res) => {
    console.log(req.body.items)//.map(item => console.log(item)));
    /* const queries = [
        { query: "SELECT product_id, product_name, product_type FROM inventory" },
        { query: "SELECT product_id, product_name, price, product_type FROM menu" }
    ];

    const sql = conn.pgp.helpers.concat(queries);
    const [inventoryItems, menuItems] = await conn.db.multi(sql);

    const [bases, proteins, toppings, dressings] = getItemsByType(inventoryItems);

    res.json({
        menuItems: menuItems,
        bases: bases,
        proteins: proteins,
        toppings: toppings,
        dressings: dressings,
    }); */
    res.send(JSON.stringify("hello"))
});

module.exports = router;
