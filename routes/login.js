const express = require("express");
const router = express.Router();
const conn = require("../db");
const { OAuth2Client } = require("google-auth-library");
require("dotenv").config();

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

router.post("/", async (req, res) => {
    try {
        const { token } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID
        });

        if (ticket.error) {
            return res.status(400).json({
                message: ticket.error
            });
        }

        const { email } = ticket.getPayload();

        // get user
        const query = `SELECT * FROM employees WHERE email = '${email}'`;
        const employee = await conn.db.query(query);
        const validEmployee = employee.length > 0;

        if (!validEmployee) {
            return res.status(401).json({
                message: "You are not authorized.",
            });
        }

        res.status(201).json({ employee: employee[0] });
    } catch (err) {
        res.status(500).json({
            message: err?.message || err,
        });
    }
});

module.exports = router;
