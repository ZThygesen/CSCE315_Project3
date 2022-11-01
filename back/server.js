const express = require("express");

const app = express();
const port = 5000;
const home = require("./routes/home");
const inventory = require("./routes/inventory");

app.use("/api/home", home);
app.use("/api/inventory", inventory);

app.listen(port, () => {console.log(`Server started on port ${port}`)});

