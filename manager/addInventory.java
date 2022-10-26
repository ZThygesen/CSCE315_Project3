package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.UUID;

/**
 * @author Zach Thygesen
 * 
 * Inventory screen for manage to add items to inventory.
 */
public class addInventory implements ActionListener {
    Connection conn;

    JFrame inventoryAddFrame = new JFrame();
    JButton inventoryAddConfirm = new JButton("Confirm");
    JButton backButton = new JButton("Back");

    TextField nameItem = new TextField("Enter item name");
    TextField priceItem = new TextField("Enter selling price of item");
    TextField quanItem = new TextField("Enter amount of item in inventory");
    TextField typeItem = new TextField("Enter type of item (Rice, Protein, Topping, Side)");
    TextField serveItem = new TextField("Enter the serving size");
    TextField onHandItem = new TextField("Enter the on-hand amount");

    /**
     * Constructor for add inventory screen
     * 
     * @param conn Passes database connection
     */
    addInventory(Connection conn) {
        this.conn = conn;

        inventoryAddConfirm.addActionListener(this);
        backButton.addActionListener(this);

        inventoryAddFrame.add(nameItem);
        inventoryAddFrame.add(priceItem);
        inventoryAddFrame.add(quanItem);
        inventoryAddFrame.add(typeItem);
        inventoryAddFrame.add(serveItem);
        inventoryAddFrame.add(onHandItem);
        inventoryAddFrame.add(inventoryAddConfirm);
        inventoryAddFrame.add(backButton);

        inventoryAddFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        inventoryAddFrame.setSize(1280, 720);
        inventoryAddFrame.setLayout(new GridLayout(6, 2));
        inventoryAddFrame.setLocationRelativeTo(null);
        inventoryAddFrame.setVisible(true);
    }
    
    /**
     * Adds specific item into inventory given its ID, name, type, price, quantity, and serving size
     */
    public void addItemToInventory() {
        try {
            Statement stmt = conn.createStatement();

            UUID newID = UUID.randomUUID();
            String sqlStatement = "INSERT INTO inventory (product_id, product_name, product_type, price, total_quantity, serving_size, min_quantity) VALUES (";
            sqlStatement += "'" + newID + "', '" + nameItem.getText() + "', '" + typeItem.getText() + "', "
                    + priceItem.getText() + ", " + quanItem.getText() + ", " + serveItem.getText() + ", " + onHandItem.getText() + ")";

            stmt.executeUpdate(sqlStatement);
        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error in adding a new item. Did you enter all the fields");
        }

        showInventory.updateInventoryDisplay(conn);
        showInventory.inventoryFrame.setVisible(true);
        inventoryAddFrame.setVisible(false);
    }

    /**
     * @param e ArrayList of type String containing the business' inventory items
     */

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == inventoryAddConfirm) {
            addItemToInventory();
        }
        
        if (e.getSource() == backButton) {
            showInventory.inventoryFrame.setVisible(true);
            inventoryAddFrame.setVisible(false);
        }
    }
}
