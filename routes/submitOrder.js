const express = require("express");
const router = express.Router();
const conn = require("../db");
const uuid = require("uuid");

/**
 * @description Grabs employee ids from database
 * @returns employee_id
 */
async function getEmployeeId() {
    const query = "SELECT * FROM employees";

    const employees = await conn.db.query(query);
   
    const employee = employees[Math.floor(Math.random() * employees.length)];

    return employee.employee_id;
}

/**
 * @description Creates customers using random combination of first and last names.
 * Inserts these customer names into the database along with a random UUID.
 * @returns customerId
 */
async function createAndInsertCustomer() {
    const firstNames = ["Carter", "Anthony", "Jennifer", "Stacy", "Tony", "Mary", "Eric", "Lori", "Roy", "Amanda"];
    const lastNames = ["Jenkins", "Rodriguez", "Thompson", "Clark", "Banks", "Robertson", "Jefferson", "Brown", "Quinn", "Gibson"];

    const customerId = uuid.v4();
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    const query = `INSERT INTO customers (customer_id, firstname, lastname) VALUES ('${customerId}', '${firstName}', '${lastName}')`;

    await conn.db.query(query);

    return customerId;
}

/**
 * @description Inserts order into database given variables
 * @param {*} orderId 
 * @param {*} employeeId 
 * @param {*} customerId 
 * @param {*} orderPrice 
 * @param {*} orderDate 
 */
async function createAndInsertOrder(orderId, employeeId, customerId, orderPrice, orderDate) {
    const query = `INSERT INTO orders (order_id, employee_id, customer_id, total_price, order_date) 
        VALUES ('${orderId}', '${employeeId}', '${customerId}', ${orderPrice}, '${orderDate}')`;
    
    await conn.db.query(query);
}

/**
 * @description Determines if items list contains an extra
 * @param {*} items 
 * @param {*} extra 
 * @returns items filter
 */
function containsExtra(items, extra) {
    return (items.filter(item => item.product_name === `Extra ${extra}`).length > 0);
}

/**
 * @description Database query to remove items from inventory
 * @param {*} productId 
 * @param {*} amount 
 */
async function subtractFromInventory(productId, amount) {
    const query = `UPDATE inventory SET total_quantity = total_quantity - ${amount}
        WHERE product_id = '${productId}'`;
    
    await conn.db.query(query);
}

/**
 * @description Inserts information from order into order_product 
 * relation table in database
 * @param {*} orderId 
 * @param {*} orderItems 
 */
async function createAndInsertOrderProducts(orderId, orderItems) {
    let query = "INSERT INTO order_product (order_id, product_id, servings) VALUES";

    // convert orderItems into an array, where each element is 
    // another array of items (i.e. a bowl, a gyro, or a side) belonging to an order
    const items = orderItems.map(item => item.items);

    let containsInvItems = false;
    
    // for each individual item in an order, add it to the database
    items.forEach(item => {
        // see if the particular item (i.e. a bowl or gyro) contains extra of something
        const hasExtraProtein = containsExtra(item, "Protein");
        const hasExtraDressing = containsExtra(item, "Dressing");

        // go through all the items (i.e. rice, chicken, tomatoes, etc.) that make up the order and add them to the query string
        item.forEach(product => {
            // check to make sure the item does not belong in the menu table;
            // we don't want to add those to the order_product table
            if (product.product_type !== "Extra" && product.product_type !== "Side") {
                containsInvItems = true;
                let servings = 1
                // if the bowl or gyro contained extra, reflect that here
                if ((product.product_type === "Protein" && hasExtraProtein) ||
                    (product.product_type === "Dressing" && hasExtraDressing)) {
                    servings += 1;
                }

                subtractFromInventory(product.product_id, product.serving_size * servings);
                query += `('${orderId}', '${product.product_id}', ${servings}),`;
            }
        });
        
    });
    
    // remove the extra comma at the end of the query string
    query = query.slice(0, -1);
    
    if (containsInvItems) {
        await conn.db.query(query);
    }
} 

router.post("/", async (req, res) => {
    const orderId = uuid.v4();
    const employeeId = await getEmployeeId();
    const customerId = await createAndInsertCustomer();
    const orderPrice = req.body.price;
    const orderDate = new Date().toISOString().split("T")[0];
    await createAndInsertOrder(orderId, employeeId, customerId, orderPrice, orderDate);
    await createAndInsertOrderProducts(orderId, req.body.items);
    
    res.json("Success!");
});

module.exports = router;
