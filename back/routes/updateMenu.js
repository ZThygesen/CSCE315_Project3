const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async (req, res) => {
    var temp = "UPDATE menu SET ";

    if(req.body.price != ''){
        temp += "price = " + req.body.price + ", ";
    }
    if(req.body.cal != ''){
        if(req.body.cal === "NULL"){
            temp += "calories = " + req.body.cal + ", ";
        } else {
            temp += "calories = \'" + req.body.cal + "\', ";
        }
    }
    if(req.body.type != ''){
        temp += "product_type = \'" + req.body.type + "\', ";
    }

    const query = temp.substring(0, temp.length-2) + " WHERE product_id = \'" + req.body.id + "\'";


    await conn.db.query(query);

    res.json("Item updated successfully!");
});

module.exports = router;
