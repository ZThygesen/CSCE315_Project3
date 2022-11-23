const express = require("express");
const path = require("path");

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
const excessReport = require("./routes/excessReport");
const salesReport = require("./routes/salesReport");
const removeMenu = require("./routes/removeMenu");
const updateMenu = require("./routes/updateMenu");

app.use(express.json());
app.use("/api/order-items", orderItems);
app.use("/api/submit-order", submitOrder);
app.use("/api/inventory", inventory);
app.use("/api/menu", menu);
app.use("/api/update-inv", updateInv);
app.use("/api/add-inv", addInv);
app.use("/api/remove-inv", removeInv);
app.use("/api/add-menu", addMenu);
app.use("/api/excess-report", excessReport);
app.use("/api/sales-report", salesReport);
app.use("/api/remove-menu", removeMenu);
app.use("/api/update-menu", updateMenu);

app.use(express.static(path.join(__dirname, "front/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build/index.html"));
})

app.listen(port, () => {console.log(`Server started on port ${port}`)});

