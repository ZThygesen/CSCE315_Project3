const express = require("express");

const app = express();
const port = 5000;
const home = require("./routes/home");
const inventory = require("./routes/inventory");
const menu = require("./routes/menu");
const orderItems = require("./routes/orderItems");

app.use("/api/home", home);
app.use("/api/inventory", inventory);
app.use("/api/menu", menu);
app.use("/api/order-items", orderItems);

app.listen(port, () => {console.log(`Server started on port ${port}`)});

