const express = require("express");
const app = express();
const home = require("./routes/home");

app.use("/api/home", home);

app.get("/api", (req, res) => {
    res.send("Hello world from express!");
});

app.listen(5000, () => {console.log("Server started on port 5000")});
