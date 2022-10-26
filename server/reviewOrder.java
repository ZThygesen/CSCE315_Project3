package server;
import javax.swing.*;
import java.sql.*;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.UUID;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.awt.Font;
import javax.swing.JFrame;
import javax.swing.JPanel;
import java.util.Random;

/**
 * @author Zach Thygesen
 * @author Justin Heger
 * 
 * Creates a screen for server to review customer's 
 * order selections and total price before placing order.
 */

public class reviewOrder extends JPanel implements ActionListener  {
    Connection conn;
    JFrame placeOrderFrame;

    // Contains all the items in the order
    ArrayList<String> orderItems;
    ArrayList<String> extraItems;

    // Need employee who took order to be inserted into database
    String employeeFirst;
    String employeeLast;

    // Review order window contents
    JFrame reviewOrderFrame = new JFrame();

    JButton editOrderButton = new JButton("Edit Order");
    JButton cancelOrderButton = new JButton("Cancel Order");
    JButton confirmOrderButton = new JButton("Confirm Order");
    Boolean placeOrder = false;

    JTextArea orderResults = new JTextArea("Order Results");
    JTextArea totalPrice = new JTextArea("Total Price");
    JPanel orderResultsPanel = new JPanel();
    JPanel reviewOrderPanel = new JPanel();

    /**
     * The review order constructor uses previously-made lists and employee information
     * to generate an easy-to-read screen that goes over order information.
     * 
     * @param conn              Passes database connection
     * @param orderItems        ArrayList of order items displays list of selected items from the create order menu
     * @param extraItems        ArrayList of extra items displays list of selected extras from the create order menu
     * @param employeeFirst     First name of employee used to create data for database tables
     * @param employeeLast      Last name of employee used to create data for database tables
     */
    reviewOrder(Connection conn, JFrame placeOrderFrame, ArrayList<String> orderItems, ArrayList<String> extraItems, String employeeFirst, String employeeLast) {
        this.conn = conn;
        this.placeOrderFrame = placeOrderFrame;
        this.orderItems = orderItems;
        this.extraItems = extraItems;
        this.employeeFirst = employeeFirst;
        this.employeeLast = employeeLast;

        orderResultsPanel.add(orderResults);
        orderResultsPanel.add(totalPrice);
        reviewOrderPanel.add(confirmOrderButton);
        reviewOrderPanel.add(editOrderButton);
        reviewOrderPanel.add(cancelOrderButton);
        reviewOrderFrame.add(orderResultsPanel);
        reviewOrderFrame.add(reviewOrderPanel);
    
        // Default settings for review order window
        editOrderButton.setBounds(100, 160, 200, 40);
        editOrderButton.setFocusable(false);
        editOrderButton.addActionListener(this);

        cancelOrderButton.setBounds(100, 160, 200, 40);
        cancelOrderButton.setFocusable(false);
        cancelOrderButton.addActionListener(this);

        confirmOrderButton.setBounds(100, 160, 200, 40);
        confirmOrderButton.setFocusable(false);
        confirmOrderButton.addActionListener(this);

        reviewOrderPanel.setBounds(200, 200, 200, 200);
        reviewOrderPanel.setLayout(new GridLayout(3,1));

        orderResultsPanel.setLayout(new GridLayout(2,1));
        orderResultsPanel.setBorder(BorderFactory.createTitledBorder("Ordered Items"));

        orderResults.setBounds(120, 80, 400, 400);
        orderResults.setFont(new Font("Monospace", Font.BOLD, 20));

        totalPrice.setFont(new Font("Monospace", Font.BOLD, 20));
        totalPrice.setAlignmentY(BOTTOM_ALIGNMENT);
        totalPrice.setAlignmentX(BOTTOM_ALIGNMENT);
        
        displayCurrentOrder(orderItems);
        reviewOrderFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        reviewOrderFrame.setSize(1280, 720);
        reviewOrderFrame.setLayout(new GridLayout(0,2));
        reviewOrderFrame.setLocationRelativeTo(null);
        reviewOrderFrame.setVisible(true);
    }

    /**
     * Takes items list of selected items and displays them in a JTextField object in the
     * review order screen.
     * 
     * @param orderItems  ArrayList of ordered items is displayed in review order menu to server/user
     */

    public void displayCurrentOrder(ArrayList<String> orderItems) {

        String items = "";
        for (int i = 0; i < orderItems.size(); i++) {
            items += orderItems.get(i) + "\n";
        }

        for (int i = 0; i < extraItems.size(); i++) {
            items += extraItems.get(i) + "\n";
        }
        
        orderResults.setText(items);
        getOrderPrice();
    }

    /**
     * Carries out the process of creating an order and inserting it into the database
     */
    public void placeOrder() {
        UUID orderID = UUID.randomUUID();
        UUID customerID = UUID.randomUUID();

        String employeeID = getEmployeeID();

        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
        String dateOrder = "'" + formatter.format((new Date())) + "'";

        createAndInsertCustomer(customerID);

        Double price = getOrderPrice();

        createAndInsertOrder(orderID, employeeID, customerID, price, dateOrder);
    
        createAndInsertOrderProducts(orderID);

        reviewOrderFrame.setVisible(false);
        options.createOrderFrame.setVisible(true);

        JOptionPane.showMessageDialog(null, "Order Placed!");
    }

    /**
     * Uses employee first and last name provided at login screen to find employee ID in database
     * @return
     */
    public String getEmployeeID() {
        String employeeID = "";
        String firstName = "'" + employeeFirst.substring(0, 1).toUpperCase() + employeeFirst.substring(1) + "'";
        String lastName = "'" + employeeLast.substring(0, 1).toUpperCase() + employeeLast.substring(1) + "'";

        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT employee_id FROM employees WHERE firstname = " + firstName + " AND lastname = " + lastName;

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                employeeID = "'" + result.getString("employee_id") + "'";
            }
        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            er.printStackTrace();
        }

        return employeeID;
    }

    /**
     * Inserts customer information into database
     * @param customerID    UUID of customer used to insert customer information into database
     */
    
    public void createAndInsertCustomer(UUID customerID) {
        // generate a random customer first and last name
        String[] firstNames = {"'Carter'", "'Anthony'", "'Jennifer'", "'Stacy'",
                    "'Tony'", "'Mary'", "'Eric'", "'Lori'", "'Roy'", "'Amanda'"};
        String[] lastNames = {"'Jenkins'", "'Rodriguez'", "'Thompson'", "'Clark'",
                    "'Banks'", "'Robertson'", "'Jefferson'", "'Brown'", "'Quinn'", "'Gibson'"};

        String firstName = firstNames[new Random().nextInt(firstNames.length)];
        String lastName = lastNames[new Random().nextInt(lastNames.length)];


        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "INSERT INTO customers (customer_id, firstname, lastname) VALUES ('" + customerID + "', " + firstName + ", " + lastName + ")";
            
            stmt.executeUpdate(sqlStatement);

        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            er.printStackTrace();
        }
    }
    /**
     * Gets total price of all items being ordered to display on the review order screen
     * @return price    total price of all items being ordered
     */

    public Double getOrderPrice() {
        Double price = 0.0;
        for (int i = 0; i < orderItems.size(); i++) {
            String productType = getProductType(orderItems.get(i));
            Double product_price = getProductPrice(orderItems.get(i));
            int servings = 1;

            if (productType == "Protein" && extraItems.contains("Extra Protein")) {
                servings = 2;
            } else if (productType == "Dressing" && extraItems.contains("Extra Dressing")) {
                servings = 2;
            }

            price += servings * product_price;
        }

        if (extraItems.contains("Extra Protein")) {
            price += 1.99;
        }

        if (extraItems.contains("Extra Dressing")) {
            price += 0.39;
        }

        totalPrice.setText("Total Price: $" + String.format("%.02f", price));
        return price;   
    }

    /**
     * When order is confirmed, will add the required information to the database.
     * 
     * @param orderID       UUID of order inserted into database (orders table)
     * @param employeeID    UUID of employee inserted into database (orders table)
     * @param customerID    UUID of customer inserted into database (orders table)
     * @param price         Price of order inserted into database (orders table)
     * @param dateOrder     Date that ordered is made is inserted into database (orders table)
     */
    public void createAndInsertOrder(UUID orderID, String employeeID, UUID customerID, Double price, String dateOrder) {
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "INSERT INTO orders (order_id, employee_id, customer_id, total_price, order_date) VALUES ('"
                    + orderID + "', " + employeeID + ", '" + customerID + "', " + Double.toString(price) + ", "
                    + dateOrder + ")";

            stmt.executeUpdate(sqlStatement);
        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            er.printStackTrace();
        }
    }

    /**
     * Inserts ordered items into relation table order_product
     * @param orderID   Order ID used to insert information into order_product relation table
     * @throws Exception    If can't connect to database 
     */

    public void createAndInsertOrderProducts(UUID orderID) {
        for (int i = 0; i < orderItems.size(); i++) {
            String productID = getProductID(orderItems.get(i));
            String productType = getProductType(orderItems.get(i));
            Double servingSize = getServingSize(orderItems.get(i));
            int servings = 1;

            // double serving size if ordered extra protein or derssing
            if (productType.equals("'Protein'") && extraItems.contains("Extra Protein")) {
                servings = 2;
            } else if (productType.equals("'Dressing'") && extraItems.contains("Extra Dressing")) {
                servings = 2;
            }

            // Add to order_product table
            try {
                Statement stmt = conn.createStatement();
                if (productID.toString() != null) {
                    String sqlStatement = "INSERT INTO order_product (order_id, product_id, servings) VALUES ('"
                        + orderID + "', " + productID.toString() + ", " + Integer.toString(servings) + ")";

                    stmt.executeUpdate(sqlStatement);
                }
                
            } catch (Exception er) {
                JOptionPane.showMessageDialog(null, "Error accessing Database.");
                er.printStackTrace();
            }

            // subtract from inventory
            Double quantityUsed = servings * servingSize;
            try {
                // create a statement object
                Statement stmt = conn.createStatement();

                String sqlStatement = "UPDATE inventory SET total_quantity = total_quantity - " +
                        Double.toString(quantityUsed) + " WHERE product_name = '" + orderItems.get(i)
                        + "'";
                // send statement to DBMS
                stmt.executeUpdate(sqlStatement);
            } catch (Exception er) {
                JOptionPane.showMessageDialog(null, "Error accessing Database.");
                er.printStackTrace();
            }
        }
    }

    /**
     * Retrives product ID from database given a name of an item
     * @param product_name  Uses product name to retrieve respective product ID
     * @return id           Returns product ID of given product name
     */
    
    public String getProductID(String product_name) {
        String id = "";
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT product_id FROM inventory WHERE product_name = '" + product_name + "'";

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                id = "'" + result.getString("product_id") + "'";
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        return id;
    }

    /**
     * Gets respective product type from database given its name
     * @param product_name   Product name used to retrieve product type inventory
     * @return type          Returns type of product given its name
     * @throws Exception     if can't access database
     */

    public String getProductType(String product_name) {
        String type = "";
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT product_type FROM inventory WHERE product_name = '" + product_name + "'";
            
            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                type = "'" + result.getString("product_type") + "'";
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        return type;
    }

    /**
     * Gets price of specific product from database given its name
     * @param product_name  Uses product name from inventory table to retrieve price
     * @return price              returns product price of given product name
     * @throws Exception     if can't access database
     */

    public Double getProductPrice(String product_name) {
        Double price = 0.0;
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT price FROM inventory WHERE product_name = '" + product_name + "'";

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                price = Double.parseDouble(result.getString("price"));
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        return price;
    }

    /**
     * Gets serving side of product from database given its name
     * @param product_name  Retrieves product serving size from inventory table given its name
     * @return size         Returns serving size of given product name
     */

    public Double getServingSize(String product_name) {
        Double size = 0.0;
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT serving_size FROM inventory WHERE product_name = '" + product_name + "'";

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                size = Double.parseDouble(result.getString("serving_size"));
            }

        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        return size;
    }

    /**
     * @param e     Button Press
     */

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == editOrderButton) {
            reviewOrderFrame.setVisible(false);
            placeOrderFrame.setVisible(true);
        }

        if (e.getSource() == confirmOrderButton) {
            placeOrder();
        }

        if (e.getSource() == cancelOrderButton) {
            reviewOrderFrame.setVisible(false);
            options.createOrderFrame.setVisible(true);
        }        
    }
}
