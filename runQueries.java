import java.sql.*;

/**
 * @author Zach Thygesen, Adam Pinto
 * 
 * Automatically runs 15 queries needed for phase three of project 2
 */
public class runQueries {

    /**
     * Automatically runs 15 queries needed for phase three of project 2
     * 
     * @param args
     * @throw Exception if command can't be executed successfully
     */
    public static void main(String args[]) {
        //Building the connection with your credentials
        Connection conn = null;
        String teamNumber = "12";
        String sectionNumber = "903";
        String dbName = "csce315_" + sectionNumber + "_" + teamNumber;
        String dbConnectionString = "jdbc:postgresql://csce-315-db.engr.tamu.edu/" + dbName;

        // Connecting to the database
        try {
            conn = DriverManager.getConnection(dbConnectionString, dbSetup.user, dbSetup.pswd);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        }

        System.out.println("Opened database successfully\n");

        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT ((SELECT sum(servings) FROM order_product WHERE product_id='6258ebbb-4436-11ed-97a8-698b2ad48b41') * (SELECT price FROM inventory WHERE product_id='6258ebbb-4436-11ed-97a8-698b2ad48b41')) AS butter_chicken_revenue;";

            try {
                // ---------------------------------------------------------
                ResultSet result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Total Butter Chicken Sales:\n\nbutter_chicken_revenue");
                    System.out.println(result.getString("butter_chicken_revenue"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT ((SELECT sum(servings) FROM order_product WHERE product_id='6258ebbc-4436-11ed-97a8-698b2ad48b41') * (SELECT price FROM inventory WHERE product_id='6258ebbc-4436-11ed-97a8-698b2ad48b41')) AS beef_gyro_revenue;";

                result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Total Beef Gyro Sales:\n\nbeef_gyro_revenue");
                    System.out.println(result.getString("beef_gyro_revenue"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT SUM(total_price) AS revenue FROM orders;";

                result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Total Revenue:\n\nrevenue");
                    System.out.println(result.getString("revenue"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT ((SELECT SUM(total_price) FROM orders) - (SELECT SUM(ship_price) FROM shipments)) AS profit;";

                result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Total Profit:\n\nprofit");
                    System.out.println(result.getString("profit"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT SUM(servings) AS rice_pilaf_sold FROM order_product WHERE product_id='6258ebb9-4436-11ed-97a8-698b2ad48b41';";

                result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Quantity Sold for Rice Pilaf:\n\nrice_pilaf_sold");
                    System.out.println(result.getString("rice_pilaf_sold"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT SUM(servings) AS veggie_medley_sold FROM order_product WHERE product_id='6258ebbe-4436-11ed-97a8-698b2ad48b41';";

                result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Quantity Sold for Veggie Medley:\n\nveggie_medley_sold");
                    System.out.println(result.getString("veggie_medley_sold"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT inventory.product_name, count(*) AS total_servings FROM order_product, inventory WHERE inventory.product_id = order_product.product_id GROUP BY inventory.product_name, order_product.product_id;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Quantity Sold by Item:\n\nproduct_name\ttotal_servings");
                while (result.next()) {
                    System.out.println(result.getString("product_name") + "\t" + result.getString("total_servings"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT (SELECT SUM(total_price) FROM orders WHERE order_date BETWEEN '2022-10-03' AND '2022-10-09') AS sales_week_1;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Sales on Week 1:\n\nsales_week_1");
                while (result.next()) {
                    System.out.println(result.getString("sales_week_1"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT (SELECT SUM(total_price) FROM orders WHERE order_date BETWEEN '2022-10-10' AND '2022-10-16') AS sales_week_2;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Sales on Week 2:\n\nsales_week_2");
                while (result.next()) {
                    System.out.println(result.getString("sales_week_2"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT (SELECT SUM(total_price) FROM orders WHERE order_date BETWEEN '2022-10-17' AND '2022-10-23') AS sales_week_3;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Sales on Week 3:\n\nsales_week_3");
                while (result.next()) {
                    System.out.println(result.getString("sales_week_3"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT ((SELECT SUM(total_price) FROM orders WHERE order_date != '2022-10-08' AND order_date != '2022-10-15') / (SELECT COUNT(DISTINCT order_date) FROM orders WHERE order_date != '2022-10-08' AND order_date != '2022-10-15')) AS reg_day_avg;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Average Sales on Regular Day:\n\nreg_day_avg");
                while (result.next()) {
                    System.out.println(result.getString("reg_day_avg"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT (SELECT SUM(total_price) FROM orders WHERE order_date = '2022-10-08' OR order_date = '2022-10-15') / 2 AS game_day_avg;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Average Sales on Game Day:\n\ngame_day_avg");
                while (result.next()) {
                    System.out.println(result.getString("game_day_avg"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT SUM(ship_price) AS total_spent_on_shipments FROM shipments;";

                result = stmt.executeQuery(sqlStatement);
                while (result.next()) {
                    System.out.println("Total Spent on Shipments:\n\ntotal_spent_on_shipments");
                    System.out.println(result.getString("total_spent_on_shipments"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT employee_id, COUNT(*) AS total_num_served FROM orders WHERE employee_id='6258ebd3-4436-11ed-97a8-698b2ad48b41' GROUP BY employee_id;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Total Number of Orders Served by an Employee (Ardian):\n\nemployee_id\ttotal_num_served");
                while (result.next()) {
                    System.out.println(result.getString("employee_id") + "\t" + result.getString("total_num_served"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT employees.firstName, COUNT(*) AS total_num_served FROM employees, orders WHERE employees.employee_id = orders.employee_id GROUP BY employees.firstName, orders.employee_id;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Total Number of Orders Served by an All Employees:\n\nfirstname\ttotal_num_served");
                while (result.next()) {
                    System.out.println(result.getString("firstname") + "\t" + result.getString("total_num_served"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT order_date, COUNT(*) AS num_orders FROM orders GROUP BY order_date ORDER BY order_date ASC;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Number of Orders for Each Date:\n\norder_date\tnum_orders");
                while (result.next()) {
                    System.out.println(result.getString("order_date") + "\t" + result.getString("num_orders"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                System.in.read();
                // ---------------------------------------------------------
                sqlStatement = "SELECT inventory.product_name, sum(order_product.servings) AS total_servings FROM order_product, inventory WHERE inventory.product_id = order_product.product_id AND inventory.product_type = 'Protein' GROUP BY inventory.product_name, order_product.product_id;";

                result = stmt.executeQuery(sqlStatement);
                System.out.println("Total Servings by Protein:\n\nproduct_name\ttotal_servings");
                while (result.next()) {
                    System.out.println(result.getString("product_name") + "\t" + result.getString("total_servings"));
                    System.out.println("");
                }
                System.out.println("----------------------");
                // ---------------------------------------------------------
                System.out.println("");

            } catch (Exception e) {
                e.printStackTrace();
                System.err.println(e.getClass().getName() + ": " + e.getMessage());
            }
        } catch (Exception e){
            e.printStackTrace();
            System.err.println(e.getClass().getName()+": "+e.getMessage());
            System.exit(0);
        }

        // closing the connection
        try {
            conn.close();
            System.out.println("Connection Closed.");
        } catch(Exception e) {
            System.out.println("Connection NOT Closed.");
        }
    }
}
