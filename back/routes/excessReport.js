const express = require("express");
const { serialize } = require("pg-protocol");
const router = express.Router();
const conn = require("../db");

router.get("/", async(req, res) => {
    var start = "2022-10-16";
    var end = "2022-12-05";
    const query = "SELECT inventory.product_name, COUNT(*) AS total_servings, inventory.total_quantity," + 
    "inventory.serving_size FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id = " +
    "order_product.order_id AND orders.order_date BETWEEN '" + start + "' AND '" + end + 
    "' GROUP BY inventory.product_name, inventory.total_quantity, inventory.serving_size";
    excessReport = await conn.db.query(query);
    console.log(excessReport);
    
    
    res.json({ excessReport: excessReport.map(getExcess) });
});

function getExcess(item) {
    var whattest = item.product_name;
    //console.log(whattest);

    numItemsSold = Number(item.total_servings) * item.serving_size;
    if ((numItemsSold / (item.total_quantity+numItemsSold)) < 0.1) {
        console.log(item.product_name);
    }
    return whattest;
    // Double numItemsSold = Double.parseDouble(result.getString("total_servings")) * Double.parseDouble(result.getString("serving_size"));

    // if((numItemsSold / (Double.parseDouble(result.getString("total_quantity"))+numItemsSold)) < 0.1){
    //     listOfExcessItems += result.getString("product_name") + "\n";
    // }
    // whattest += item;
}
module.exports = router;


