const express = require("express");

const app = express();
const port = 5000;
const orderItems = require("./routes/orderItems");
const submitOrder = require("./routes/submitOrder");
const inventory = require("./routes/inventory");
const menu = require("./routes/menu");
const updateInv = require("./routes/updateInv");
const addInv = require("./routes/addInv");
const removeInv = require("./routes/removeInv");
const addMenu = require("./routes/addMenu");
const removeMenu = require("./routes/removeMenu");

app.use(express.json());
app.use("/api/order-items", orderItems);
app.use("/api/submit-order", submitOrder);
app.use("/api/inventory", inventory);
app.use("/api/menu", menu);
app.use("/api/update-inv", updateInv);
app.use("/api/add-inv", addInv);
app.use("/api/remove-inv", removeInv);
app.use("/api/add-menu", addMenu);
app.use("/api/remove-menu", removeMenu);

app.listen(port, () => {console.log(`Server started on port ${port}`)});

