import java.sql.*;
import java.util.Scanner;
import java.util.Vector;

/**
 * @author Justin Heger
 * Adds comapny's tables to database.
 */
public class addTables {
/** Uses database commands to create tables to be used by the POS
 * 
 * @param args
 * @throw Exception if can't access database
 */
    public static void main(String args[]){
        //Building the connection with your credentials
        Connection conn = null;
        String teamNumber = "12";
        String sectionNumber = "903";
        String dbName = "csce315_" + sectionNumber + "_" + teamNumber;
        String dbConnectionString = "jdbc:postgresql://csce-315-db.engr.tamu.edu/" + dbName;

        //Connecting to the database
        try {
            conn = DriverManager.getConnection(dbConnectionString, dbSetup.user, dbSetup.pswd);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        }

        System.out.println("Opened database successfully");

        // User input system
        Scanner sc = new Scanner(System.in);
        System.out.println("Type 'a' to add tables and 'd' to drop tables: "); 
        String answer = sc.nextLine();
        sc.close();

        //Add tables here
        Vector<String> tables = new Vector<>();

        if (answer.equals("a")) {
            System.out.println("Adding Tables..."); 
            tables.add("CREATE TABLE customers (customer_ID VARCHAR(255) PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255))");
            tables.add("CREATE TABLE employees (employee_ID VARCHAR(255) PRIMARY KEY, firstName VARCHAR(255), lastName VARCHAR(255), DOB DATE, address VARCHAR(255), phone_number VARCHAR(255), position VARCHAR(255))");
            tables.add("CREATE TABLE shipments (shipment_ID VARCHAR(255) PRIMARY KEY, vendor VARCHAR(255), purchase_date TIMESTAMP, arrival_date TIMESTAMP, employee_ID VARCHAR(255) references employees(employee_ID), ship_price DOUBLE PRECISION)");
            tables.add("CREATE TABLE inventory (product_ID VARCHAR(255) PRIMARY KEY, product_name VARCHAR(255), product_type VARCHAR(255), price DOUBLE PRECISION, total_quantity DOUBLE PRECISION)");
            tables.add("CREATE TABLE orders (order_ID VARCHAR(255) PRIMARY KEY, employee_ID VARCHAR(255) references employees(employee_ID), customer_ID VARCHAR(255) references customers(customer_ID), total_price DOUBLE PRECISION, order_date DATE)");
            tables.add("CREATE TABLE order_product (order_ID VARCHAR(255) references orders(order_ID), product_ID VARCHAR(255) references inventory(product_ID), servings INT)");
            tables.add("CREATE TABLE shipment_product (shipment_ID VARCHAR(255) references shipments(shipment_ID), product_ID VARCHAR(255) references inventory(product_ID), ship_quantity DOUBLE PRECISION, expiration_date TIMESTAMP)");
        
            // Grant table permissions to all team members in database
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_kuswanto");
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_heger");
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_pinto");
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_thygesen");
        }
        else if (answer.equals("d")) {
            System.out.println("Dropping Tables..."); 

            // Grant table permissions to all team members in database
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_kuswanto");
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_heger");
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_pinto");
            tables.add("GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO csce315_903_thygesen");

            tables.add("DROP TABLE IF EXISTS shipment_product");
            tables.add("DROP TABLE IF EXISTS order_product");
            tables.add("DROP TABLE IF EXISTS shipments");
            tables.add("DROP TABLE IF EXISTS orders");
            tables.add("DROP TABLE IF EXISTS inventory");
            tables.add("DROP TABLE IF EXISTS employees");
            tables.add("DROP TABLE IF EXISTS customers");
        }
        else {
            System.out.println("Invalid Input."); 
        }
        
        try {
            for (int i = 0; i < tables.size();  i++) {
                Statement stmt = conn.createStatement();
                String sqlStatement = tables.get(i);
                stmt.executeUpdate(sqlStatement);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        } 
        
        // closing connection
        try {
            conn.close();
            System.out.println("Connection Closed.");
        } catch(Exception e) {
            System.out.println("Connection NOT Closed.");
        }
    
    }
}
