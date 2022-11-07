const express = require("express");

const app = express();
const port = 5000;
const home = require("./routes/home");
const inventory = require("./routes/inventory");
const menu = require("./routes/menu");
const orderItems = require("./routes/orderItems");
const updateInv = require("./routes/updateInv");
const addInv = require("./routes/addInv");

app.use(express.json());
app.use("/api/home", home);
app.use("/api/inventory", inventory);
app.use("/api/menu", menu);
app.use("/api/order-items", orderItems);
app.use("/api/update-inv", updateInv);
app.use("/api/add-inv", addInv);


function fahrenheitToCelsius(fahrenheit) {
    return (fahrenheit - 32) * (5 / 9);
}

app.post("/api/temp", (req, res) => {
    console.log(req.body);
    const celsius = fahrenheitToCelsius(req.body.temp);
    res.json(celsius);
});

app.listen(port, () => {console.log(`Server started on port ${port}`)});

