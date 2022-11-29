const express = require("express");
const router = express.Router();
const conn = require("../db");
/**
 * 
 * @param {*} items 
 * @returns items list
 */
function getItemsByType(items) {
    bases = items.filter(item => item.product_type === "Rice");
    proteins = items.filter(item => item.product_type === "Protein");
    toppings = items.filter(item => item.product_type === "Topping");
    dressings = items.filter(item => item.product_type === "Dressing"); 
    pita = items.filter(item => item.product_type === "Pita");

    return [bases, proteins, toppings, dressings, pita];
}

router.get("/", async (req, res) => {
    const queries = [
        { query: "SELECT product_id, product_name, product_type, serving_size FROM inventory" },
        { query: "SELECT product_id, product_name, price, product_type FROM menu" }
    ];

    const sql = conn.pgp.helpers.concat(queries);
    const [inventoryItems, menuItems] = await conn.db.multi(sql);

    const [bases, proteins, toppings, dressings, pita] = getItemsByType(inventoryItems);

    res.json({
        menuItems: menuItems,
        bases: bases,
        proteins: proteins,
        toppings: toppings,
        dressings: dressings,
        pita: pita
    });
});

module.exports = router;
