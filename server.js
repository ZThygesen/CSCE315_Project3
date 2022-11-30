const express = require("express");
const path = require("path");

const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

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

app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
);

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

async function verifyGoogleToken(token) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: GOOGLE_CLIENT_ID,
        });

        return { payload: ticket.getPayload() };
    } catch (err) {
        return { err: "Invalid user detected. Please try again" };
    }
}

app.post("/api/login", async (req, res) => {
    try {
        if (req.body.credential) {
            const verificationResponse = await verifyGoogleToken(req.body.credential);

            if (verificationResponse.err) {
                return res.status(400).json({
                    message: verificationResponse.err,
                });
            }

            const profile = verificationResponse?.payload;

            console.log(profile);
            const validEmployee = true;
            if (!validEmployee) {
                return res.status(400).json({
                    message: "You are not authorized.",
                });
            }

            res.status(201).json({
                message: "Login was successful",
                user: {
                    firstName: profile?.given_name,
                    lastName: profile?.family_name,
                    picture: profile?.picture,
                    email: profile?.email,
                    token: jwt.sign({ email: profile?.email }, process.env.JWT_SECRET, {
                        expiresIn: "1d",
                    }),
                },
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
        });
    }
});


app.use(express.static(path.join(__dirname, "front/build")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "front/build/index.html"));
})

const server = app.listen(process.env.PORT || port, () => {
    const currPort = server.address().port;
    console.log(`Server started on port ${currPort}`);
});

