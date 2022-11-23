const pgp = require("pg-promise")();
require("dotenv").config();

const connection = {
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: { rejectUnauthorized: false }
};

const db = pgp(connection);

module.exports = {
    db: db,
    pgp: pgp
};
