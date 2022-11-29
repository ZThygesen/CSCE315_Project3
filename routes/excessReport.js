const express = require("express");
const router = express.Router();
const conn = require("../db");

function pad(num) {
    return (num < 10 ? "0" : "") + num;
}

router.post("/", async(req, res) => {
    const startDate = new Date(req.body.start);
    const endDate = new Date(req.body.end);

    const start = `'${startDate.getFullYear()}-${pad(startDate.getMonth() + 1)}-${pad(startDate.getDate())}'`;
    const end = `'${endDate.getFullYear()}-${pad(endDate.getMonth() + 1)}-${pad(endDate.getDate())}'`;

    const query = `SELECT inventory.product_name, COUNT(*) AS total_servings, inventory.total_quantity,
        inventory.serving_size FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id =
        order_product.order_id AND orders.order_date BETWEEN ${start} AND ${end} 
        GROUP BY inventory.product_name, inventory.total_quantity, inventory.serving_size`;
    
    items = await conn.db.query(query);
    
    const excessItems = getExcess(items);
    
    res.json({ items: excessItems});
});
/**
 * @author Justin
 * Takes items from given database query and determines if 
 * they belong in the excess report
 * 
 * @param {*} items 
 * @returns items that match filter
 */

function getExcess(items) {
    return items.filter(item => {
        const numItemsSold = (Number(item.total_servings) * item.serving_size);
        return (numItemsSold / (item.total_quantity + numItemsSold)) < 0.1
    });
}

module.exports = router;


