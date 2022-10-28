package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

/**
 * @author Zach Thygesen
 * 
 * Allows manager to remove item from company's database system.
 */
public class removeInventory implements ActionListener {
    Connection conn;

    JButton inventoryRemoveConfirm = new JButton("Remove Item");
    JFrame inventoryRemoveFrame = new JFrame();
    JButton backButton = new JButton("Back");
    JComboBox<String> items;

    /**
     * Constructor for remove from inventory screen.
     * Screen allows manager to remove an item from the company's
     * inventory.
     * 
     * @param conn              Passes database connection
     * @param inventoryItems    Array of type string that contains a list of inventory items retrieved from the database
     */

    removeInventory(Connection conn, ArrayList<String> inventoryItems) {
        this.conn = conn;

        inventoryRemoveConfirm.addActionListener(this);
        backButton.addActionListener(this);

        // Convert vector into an array for dropdown menu purposes
        int arraySize = inventoryItems.size();
        String[] itemsArray = new String[arraySize];
        for (int i = 0; i < arraySize; i++) {
            itemsArray[i] = inventoryItems.get(i);
        }
        items = new JComboBox<String>(itemsArray);

        JPanel inventoryRemovePanel = new JPanel();

        inventoryRemovePanel.add(items);
        inventoryRemovePanel.add(inventoryRemoveConfirm);
        inventoryRemovePanel.add(backButton);
        inventoryRemovePanel.setLayout(new GridLayout(3, 0));
        inventoryRemoveFrame.add(inventoryRemovePanel);
        inventoryRemovePanel.setBounds(100, 160, 200, 40);

        inventoryRemoveFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        inventoryRemoveFrame.setSize(1280, 720);
        inventoryRemoveFrame.setLayout(new GridLayout(2, 0));
        inventoryRemoveFrame.setLocationRelativeTo(null);
        inventoryRemoveFrame.setVisible(true);
    }
    /**
     * Removes an item from the inventory given its product ID
     * @throws Exception if can't connect to database
     */
    public void removeItemFromInventory() {
        String itemName = "'" + items.getSelectedItem() + "'";

        try {
            Statement stmt = conn.createStatement();

            String removeInventory = "DELETE FROM inventory WHERE product_name = " + itemName;

            stmt.executeUpdate(removeInventory);

        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            er.printStackTrace();
        }

        showInventory.updateInventoryDisplay(conn);
        showInventory.inventoryFrame.setVisible(true);
        inventoryRemoveFrame.setVisible(false);
    }

    /**
     * @param e     Button press
     */

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == inventoryRemoveConfirm) {
            removeItemFromInventory();
        }

        if (e.getSource() == backButton) {
            showInventory.inventoryFrame.setVisible(true);
            inventoryRemoveFrame.setVisible(false);
        }
    }
}
