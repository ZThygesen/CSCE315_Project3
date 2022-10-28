package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;

/**
 * @author Zach Thygesen
 * Gives manager the option to update an exisiting item in the inventory table of the database.
 */
public class updateInventory implements ActionListener {
    Connection conn;

    JButton inventoryUpdateConfirm = new JButton("Confirm");
    JFrame inventoryUpdateFrame = new JFrame();
    JButton backButton = new JButton("Back");
    TextField priceItem1 = new TextField("");
    TextField quanItem1 = new TextField("");
    TextField serveItem1 = new TextField("");
    TextField onHandItem1 = new TextField("");
    JComboBox<String> items;

    /**
     * Gives manager the option to update an exisiting item in the inventory table of the database.
     * 
     * @param conn              Passes database connection
     * @param inventoryItems    ArrayList of type String containing the business' inventory items
     * @throws exception if database can't be accessed
     */
    updateInventory(Connection conn, ArrayList<String> inventoryItems) {
        this.conn = conn;

        // Convert vector into an array for dropdown menu purposes
        int arraySize = inventoryItems.size();
        String[] itemsArray = new String[arraySize];
        for (int i = 0; i < arraySize; i++) {
            itemsArray[i] = inventoryItems.get(i);
        }
        items = new JComboBox<String>(itemsArray);

        inventoryUpdateConfirm.addActionListener(this);
        backButton.addActionListener(this);

        // Gives all the options for updating the inventory and displays on window
        JPanel pricePanel = new JPanel();
        TextField priceText = new TextField("Enter your update to the price below; otherwise, leave it blank");
        priceText.setEnabled(false);

        pricePanel.add(priceText);
        pricePanel.add(priceItem1);
        pricePanel.setLayout(new GridLayout(2, 0));

        JPanel quanPanel = new JPanel();
        TextField quanText = new TextField("Enter your update to the quantity below; otherwise, leave it blank");
        quanText.setEnabled(false);

        quanPanel.add(quanText);
        quanPanel.add(quanItem1);
        quanPanel.setLayout(new GridLayout(2, 0));

        JPanel servePanel = new JPanel();
        TextField serveText = new TextField("Enter your update to the serving size below; otherwise, leave it blank");
        serveText.setEnabled(false);

        servePanel.add(serveText);
        servePanel.add(serveItem1);
        servePanel.setLayout(new GridLayout(2, 0));

        JPanel onHandPanel = new JPanel();
        TextField onHandText = new TextField("Enter your update to the on-hand amount below; otherwise, leave it blank");
        onHandText.setEnabled(false);

        onHandPanel.add(onHandText);
        onHandPanel.add(onHandItem1);
        onHandPanel.setLayout(new GridLayout(2, 0));
        
        JPanel updates = new JPanel();
        updates.add(pricePanel);
        updates.add(quanPanel);
        updates.add(servePanel);
        updates.add(onHandPanel);
        updates.setLayout(new GridLayout(2, 2));

        inventoryUpdateFrame.add(items);
        inventoryUpdateFrame.add(updates);
        inventoryUpdateFrame.add(inventoryUpdateConfirm);
        inventoryUpdateFrame.add(backButton);

        inventoryUpdateFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        inventoryUpdateFrame.setSize(1280, 720);
        inventoryUpdateFrame.setLayout(new GridLayout(4, 0, 0, 20));
        inventoryUpdateFrame.setLocationRelativeTo(null);
        inventoryUpdateFrame.setVisible(true);
    }

    public void updateItemInInventory() {
        String price = priceItem1.getText();
        String quan = quanItem1.getText();
        String serve = serveItem1.getText();
        String onHand = onHandItem1.getText();
        String name = "'" + items.getSelectedItem() + "'";

        String sqlStatement = "UPDATE inventory SET";

        String updates = "";

        if (!price.isEmpty()) {
            updates += " price = " + price + ",";
        }
        if (!quan.isEmpty()) {
            updates += " total_quantity = " + quan + ",";
        }
        if (!serve.isEmpty()) {
            updates += " serving_size = " + serve + ",";
        }
        if(!onHand.isEmpty()){
            updates += " min_quantity = " + onHand + ",";
        }

        updates = updates.substring(0, updates.length()-1);

        /*if (!price.isEmpty() && !quan.isEmpty() && !serve.isEmpty()) {
            sqlStatement += " price = " + price + ", total_quantity = " + quan + ", serving_size = " + serve;
        } else if (!price.isEmpty() && !quan.isEmpty() && serve.isEmpty()) {
            sqlStatement += " price = " + price + ", total_quantity = " + quan;
        } else if (!serve.isEmpty() && !price.isEmpty() && quan.isEmpty()) {
            sqlStatement += " price = " + price + ", serving_size = " + serve;
        } else if (!serve.isEmpty() && !quan.isEmpty() && price.isEmpty()) {
            sqlStatement += " total_quantity = " + quan + ", serving_size = " + serve;
        } else if (!price.isEmpty()) {
            sqlStatement += " price = " + price;
        } else if (!quan.isEmpty()) {
            sqlStatement += " total_quantity = " + quan;
        } else if (!serve.isEmpty()) {
            sqlStatement += " serving_size = " + serve;
        }*/

        sqlStatement += updates + " WHERE product_name = " + name;

        try {
            Statement stmt = conn.createStatement();

            stmt.executeUpdate(sqlStatement);
        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        //JOptionPane.showMessageDialog(null,sqlStatement);  

        showInventory.updateInventoryDisplay(conn);
        showInventory.inventoryFrame.setVisible(true);
        inventoryUpdateFrame.setVisible(false);
    }

    /**
     * @param e Button press
     */
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == inventoryUpdateConfirm) {
            updateItemInInventory();
        }

        if (e.getSource() == backButton) {
            showInventory.inventoryFrame.setVisible(true);
            inventoryUpdateFrame.setVisible(false);
        }
    }
}
