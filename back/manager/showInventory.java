package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;


/**
 * @author Zach Thygesen
 * Displays inventory table from database to manager.
 */
public class showInventory implements ActionListener {
    Connection conn;

    static ArrayList<String> inventoryItems;

    // Options on inventory window
    JButton inventoryAddButton = new JButton("Add Item");
    JButton inventoryRemoveButton = new JButton("Remove Item");
    JButton inventoryUpdateButton = new JButton("Update Item");
    JButton backButton = new JButton("Back");

    static JFrame inventoryFrame = new JFrame();
    static JPanel items = new JPanel();

    /**
     * 
     * @param conn Passes database connection
     */

    showInventory(Connection conn) {
        this.conn = conn;

        updateInventoryDisplay(conn);

        // Add the button options to the window
        inventoryAddButton.addActionListener(this);
        inventoryRemoveButton.addActionListener(this);
        inventoryUpdateButton.addActionListener(this);
        backButton.addActionListener(this);

        JPanel inventoryOptions = new JPanel();
        inventoryOptions.add(inventoryAddButton);
        inventoryOptions.add(inventoryRemoveButton);
        inventoryOptions.add(inventoryUpdateButton);
        inventoryOptions.add(backButton);

        inventoryFrame.add(items, BorderLayout.CENTER);
        inventoryFrame.add(inventoryOptions, BorderLayout.SOUTH);
        inventoryFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        inventoryFrame.setSize(1280, 720);

        inventoryFrame.setLocationRelativeTo(null);
        inventoryFrame.setVisible(true);
    }

    /**
     * 
     * @param conn Passes database connection
     */

    static public ArrayList<String> getInventoryItemNames(Connection conn) {
        ArrayList<String> inventoryItems = new ArrayList<String>();

        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT product_name FROM inventory";

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                inventoryItems.add(result.getString("product_name"));
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            e.printStackTrace();
        }

        return inventoryItems;
    }

    /**
     * Constructor for updating the inventory display.
     * Update inventory display allows program to update the 
     * GUI list of inventory items when needed (such as adding
     * or removing inventory items).
     * 
     * @param conn Passes database connection
     */

    static void updateInventoryDisplay(Connection conn) {
        items.removeAll();

        // repopulate inventoryItems list because of potential change in inventory
        inventoryItems = getInventoryItemNames(conn);

        // Gets the current contents of the inventory
        String inv = "Item\n";
        String quan = "Quantity\n";
        String price = "Price\n";
        String serve = "Serving Size\n";
        String onHand = "On Hand\n";
        try {
            Statement stmt = conn.createStatement();
            String sqlStatement = "SELECT * FROM inventory";
            ResultSet result = stmt.executeQuery(sqlStatement);

            while (result.next()) {
                inv += result.getString("product_name") + "\n";
                quan += result.getString("total_quantity") + "\n";
                price += result.getString("price") + "\n";
                serve += result.getString("serving_size") + "\n";
                onHand += result.getString("min_quantity") + "\n";
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            e.printStackTrace();
        }

        // Displays the inventory's contents
        JTextArea invText = new JTextArea(inv);
        JTextArea quanText = new JTextArea(quan);
        JTextArea priceText = new JTextArea(price);
        JTextArea serveText = new JTextArea(serve);
        JTextArea onHandText = new JTextArea(onHand);

        items.add(invText);
        items.add(quanText);
        items.add(priceText);
        items.add(serveText);
        items.add(onHandText);

        items.validate();
        items.repaint();
    }

    // Switches between the different inventory option frames
    /**
     * @param e     Button press
     */
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == inventoryAddButton) {
            inventoryFrame.setVisible(false);
            new addInventory(conn);
        }

        if (e.getSource() == inventoryRemoveButton) {
            inventoryFrame.setVisible(false);
            new removeInventory(conn, inventoryItems);
        }

        if (e.getSource() == inventoryUpdateButton) {
            inventoryFrame.setVisible(false);
            new updateInventory(conn, inventoryItems);
        }

        if (e.getSource() == backButton) {
            managerGUI.managerMainFrame.setVisible(true);
            inventoryFrame.setVisible(false);
        }
    }
}
