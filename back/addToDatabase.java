import java.sql.*;
import java.io.*;
import java.util.Scanner;
import java.util.Vector;

/**
 * @author Ardian Kuswanto
 * @author Zach Thygesen
 * 
 * Adds all database information to company's tables.
*/
public class addToDatabase{
    /**
     * Adds several products from previously-generated  
     * CSV files to tables in database
     * @param args
     * @throw Exception if command can't be executed successfully
     */
    public static void main(String args[]){
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

        System.out.println("Opened database successfully");

        /*
        Asks user to give name of file with entries and places them in table specified by the file

        File must be of this format:
             ________________________________
            |(Name of table to insert to)    |
            |(Name of columns in table)      |
            |(Data entries to be inserted)   |
            |                |               |
            |                v               |
        */
        try {
            //Prompt user for name for .csv file
            //Scanner userInput = new Scanner(System.in);
            //System.out.println("Enter name for data entries (include .csv): ");

            Statement stmt = conn.createStatement();

            // create vector with all csv file paths
            Vector<String> files = new Vector<>();

            files.add("data_creation/csv_files/inventory.csv");
            files.add("data_creation/csv_files/employees.csv");
            files.add("data_creation/csv_files/customers.csv");
            files.add("data_creation/csv_files/orders.csv");
            files.add("data_creation/csv_files/order_product.csv");
            files.add("data_creation/csv_files/shipments.csv");
            files.add("data_creation/csv_files/shipment_product.csv");
            files.add("data_creation/csv_files/menu.csv");

            // loops through each of the files and adds their data to database
            for (int i = 0; i < files.size(); i++) {
                Scanner sc = new Scanner(new File(files.get(i)));

                String db = sc.nextLine();
                String columns = sc.nextLine();

                String sqlStatement = "INSERT INTO " + db + " (" + columns + ") VALUES ";

                try {
                    while (sc.hasNext()) {
                        String dataEntry = "(" + sc.nextLine() + "),"; 
                        sqlStatement += dataEntry;
                    }
                    sc.close();

                    // remove comma from end of string
                    sqlStatement = sqlStatement.substring(0, sqlStatement.length() - 1);

                    stmt.executeUpdate(sqlStatement);
                } catch (Exception e) {
                    e.printStackTrace();
                    System.err.println(e.getClass().getName() + ": " + e.getMessage());
                    continue;
                }
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
