const express = require("express");
const router = express.Router();
const conn = require("../db");

router.post("/", async (req, res) => {
    console.log(req.body);

    var temp = "UPDATE inventory SET ";

    if(req.body.quantity != ''){
        temp += "total_quantity = " + req.body.quantity + ", ";
    }
    if(req.body.type != ''){
        temp += "product_type = \'" + req.body.type + "\', ";
    }
    if(req.body.serve != ''){
        temp += "serving_size = " + req.body.serve + ", ";
    }
    if(req.body.onhand != ''){
        temp += "min_quantity = " + req.body.onhand + ", ";
    }

    const query = temp.substring(0, temp.length-2) + " WHERE product_id = \'" + req.body.id + "\'";

    console.log(query);

    await conn.db.query(query);

    //res.json({ success: 1 });
});

module.exports = router;