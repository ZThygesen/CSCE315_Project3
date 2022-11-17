const express = require("express");
const router = express.Router();
const conn = require("../db");
var excessItems = [];

router.post("/", async(req, res) => {
    var start = req.body.start;
    var end = req.body.end; 
    console.log("START: " + req.body.start + " END: " + req.body.end);
    const query = "SELECT inventory.product_name, COUNT(*) AS total_servings, inventory.total_quantity," + 
    "inventory.serving_size FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id = " +
    "order_product.order_id AND orders.order_date BETWEEN '" + start + "' AND '" + end + 
    "' GROUP BY inventory.product_name, inventory.total_quantity, inventory.serving_size";
    excessReport = await conn.db.query(query);
    
    getExcess(excessReport);
    res.json({ excessItems: excessItems});
});

function getExcess(item) {
    excessItems = [];
    item.map((element, i) => {
        var numItemsSold = Number(element.total_servings) * element.serving_size;
        if ((numItemsSold / (element.total_quantity + numItemsSold)) < 0.1) {
            console.log("ITEM INFO: " + element.product_name + " " + (numItemsSold / (element.total_quantity + numItemsSold)));
            excessItems.push(element);
        }
        return excessItems;
    }, {});
}

module.exports = router;


