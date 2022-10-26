package server;
import javax.swing.*;
import java.awt.GridLayout;
import java.awt.BorderLayout;
import java.sql.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.awt.Font;
import javax.swing.BorderFactory;

/**
 * @author Zach Thygesen
 * @author Justin Heger
 * 
 * Provides a screen in GUI for server to place order.
 */
public class createOrder implements ActionListener {
    Connection conn;
    String employeeFirst;
    String employeeLast;

    ArrayList<String> typeItems = new ArrayList<String>();
    ArrayList<String> riceItems = new ArrayList<String>();
    ArrayList<String> proteinItems = new ArrayList<String>();
    ArrayList<String> toppingItems = new ArrayList<String>();
    ArrayList<String> dressingItems = new ArrayList<String>();
    ArrayList<String> sideItems = new ArrayList<String>();

    JFrame placeOrderFrame = new JFrame();

    JPanel typePanel = new JPanel();
    ButtonGroup types = new ButtonGroup();
   
    JPanel ricePanel = new JPanel();
    ButtonGroup rices = new ButtonGroup();

    JPanel proteinPanel = new JPanel();
    ButtonGroup proteins = new ButtonGroup();

    JPanel toppingPanel = new JPanel();
    ArrayList<JCheckBox> toppings = new ArrayList<JCheckBox>();

    JPanel dressingPanel = new JPanel();
    ButtonGroup dressings = new ButtonGroup();

    JPanel sidePanel = new JPanel();
    ArrayList<JCheckBox> sides = new ArrayList<JCheckBox>();

    JPanel extraPanel = new JPanel();
    ArrayList<JCheckBox> extras = new ArrayList<JCheckBox>();

    JPanel btnOptions = new JPanel();
    JButton backButton = new JButton("Back");
    JButton orderReviewButton = new JButton("Review Order");

    ArrayList<String> orderItems = new ArrayList<String>();
    ArrayList<String> extraItems = new ArrayList<String>();

    /**
     * Creates order pannel used to select different food options and fountain drink
     * 
     * @param conn              Passes database connection
     * @param employeeFirst     Uses first name of employee to be used in creation of employee ID
     * @param employeeLast      Uses last name of employee to be used in creation of employee ID
     */
    public createOrder(Connection conn, String employeeFirst, String employeeLast) {
        this.conn = conn;
        this.employeeFirst = employeeFirst;
        this.employeeLast = employeeLast;

        orderReviewButton.addActionListener(this);
        backButton.addActionListener(this);

        populateItemArrays();
        createRicePanel();
        createProteinPanel();
        createToppingPanel();
        createDressingPanel();
        createSidePanel();
        createExtraPanel();
        createTypePanel();

        placeOrderFrame.add(typePanel);
        placeOrderFrame.add(ricePanel);
        placeOrderFrame.add(proteinPanel);
        placeOrderFrame.add(toppingPanel);
        placeOrderFrame.add(dressingPanel);
        placeOrderFrame.add(sidePanel);
        placeOrderFrame.add(extraPanel);

        btnOptions.add(backButton);
        btnOptions.add(orderReviewButton);
        placeOrderFrame.add(btnOptions);
        
        placeOrderFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        placeOrderFrame.setSize(1280, 720);
        placeOrderFrame.setLayout(new GridLayout(8, 0));
        placeOrderFrame.setLocationRelativeTo(null);
        placeOrderFrame.setVisible(true);
    }

    public ArrayList<String> getItemsByType(String productType) {
        ArrayList<String> items = new ArrayList<String>();
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT product_name FROM inventory WHERE product_type = '" + productType + "'";

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                items.add(result.getString("product_name"));
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            e.printStackTrace();
        }

        return items;
    }

    /**
     * Populates item arrays with corresponding items from inventory table in database
     */
    public void populateItemArrays() {
        // Bowl and gyro are types of orders and are not tracked in inventory
        // Therefore, we must manually add it to the choices
        typeItems.add("Bowl");
        typeItems.add("Gyro");
        riceItems = getItemsByType("Rice");
        riceItems.add("No rice");
        proteinItems = getItemsByType("Protein");
        proteinItems.add("No protein");
        toppingItems = getItemsByType("Topping");
        dressingItems = getItemsByType("Dressing");
        dressingItems.add("No dressing");
        sideItems = getItemsByType("Side");
    }

    /**
     * Creates panel for Bowl or Gyro options in create order screen
     */
    public void createTypePanel() {
        for (int i = 0; i < typeItems.size(); i++) {
            JRadioButton btn = new JRadioButton(typeItems.get(i));
            btn.setActionCommand(typeItems.get(i));
            btn.setFont(new Font("Monospace", Font.BOLD, 15));
            types.add(btn);
            typePanel.add(btn);
        }
        typePanel.setBorder(BorderFactory.createTitledBorder("Bowl or Gyro"));
    }

    /**
     * Creates panel for rice options in create order screen
     */
    public void createRicePanel() {

        for (int i = 0; i < riceItems.size(); i++) {
            JRadioButton btn = new JRadioButton(riceItems.get(i));
            btn.setActionCommand(riceItems.get(i));
            btn.setFont(new Font("Monospace", Font.BOLD, 15));
            rices.add(btn);
            ricePanel.add(btn);
        }
        ricePanel.setBorder(BorderFactory.createTitledBorder("Rice"));
    }

    /**
     * Creates panel for protein options in create order screen
     */
    public void createProteinPanel() {

        for (int i = 0; i < proteinItems.size(); i++) {
            JRadioButton btn = new JRadioButton(proteinItems.get(i));
            btn.setActionCommand(proteinItems.get(i));
            btn.setFont(new Font("Monospace", Font.BOLD, 15));
            proteins.add(btn);
            proteinPanel.add(btn);
        }
        proteinPanel.setBorder(BorderFactory.createTitledBorder("Protein"));
    }

    /**
     * Creates panel for topping options in create order screen
     */
    public void createToppingPanel() {

        for (int i = 0; i < toppingItems.size(); i++) {
            JCheckBox btn = new JCheckBox(toppingItems.get(i));
            btn.setActionCommand(toppingItems.get(i));
            btn.setFont(new Font("Monospace", Font.BOLD, 15));
            toppings.add(btn);
            toppingPanel.add(btn, BorderLayout.WEST);
        }
        toppingPanel.setBorder(BorderFactory.createTitledBorder("Topping"));   
    }

    /**
     * Creates panel for dressing options in create order screen
     */
    public void createDressingPanel() {

        for (int i = 0; i < dressingItems.size(); i++) {
            
            JRadioButton btn = new JRadioButton(dressingItems.get(i));
            btn.setActionCommand(dressingItems.get(i));
            btn.setFont(new Font("Monospace", Font.BOLD, 15));
            dressings.add(btn);
            dressingPanel.add(btn);
        }

        dressingPanel.setBorder(BorderFactory.createTitledBorder("Dressing"));
    }

    /**
     * Creates panel for side options in create order screen
     */
    public void createSidePanel() {

        for (int i = 0; i < sideItems.size(); i++) {
            JCheckBox btn = new JCheckBox(sideItems.get(i));
            btn.setActionCommand(sideItems.get(i));
            btn.setFont(new Font("Monospace", Font.BOLD, 15));
            sides.add(btn);
            sidePanel.add(btn);
        }

        sidePanel.setBorder(BorderFactory.createTitledBorder("Sides"));
    }

    /**
     * Creates panel for extra options in create order screen
     */
    public void createExtraPanel() {
        
        extraPanel.setBorder(BorderFactory.createTitledBorder("Extras"));

        JCheckBox extraProtein = new JCheckBox("Extra Protein");
        JCheckBox extraDressing = new JCheckBox("Extra Dressing");

        extraProtein.setActionCommand("Extra Protein");
        extraProtein.setFont(new Font("Monospace", Font.BOLD, 15));

        extraDressing.setActionCommand("Extra Dressing");
        extraDressing.setFont(new Font("Monospace", Font.BOLD, 15));

        extras.add(extraProtein);
        extras.add(extraDressing);

        extraPanel.add(extraProtein);
        extraPanel.add(extraDressing);
    }

    /**
     * When server presses review order button, will compile all 
     * food options to send to review order screen. This function
     * also checks if certain prohibited combinations of items exist.
     */
    public void sendToReviewOrder() {
        orderItems.clear();
        extraItems.clear();

        // check type selection
        if (types.getSelection() == null) {
            JOptionPane.showMessageDialog(null, "Please select a Gyro or Bowl!");
            return;
        }

        // check rice selection
        if (rices.getSelection() != null && types.getSelection().getActionCommand() == "Bowl") {
            // only add to array if an actual rice option is selected
            // "No rice" is not an item in the inventory, so we don't want to try and add it
            if (rices.getSelection().getActionCommand() != "No rice") {
                orderItems.add(rices.getSelection().getActionCommand());
            }
        } else if (rices.getSelection() != null && types.getSelection().getActionCommand() == "Gyro" && rices.getSelection().getActionCommand() != "No rice") {
            JOptionPane.showMessageDialog(null, "Cannot serve rice with Gyro!");
            return;
        } else if ((rices.getSelection() == null || rices.getSelection().getActionCommand() == "No rice") && types.getSelection().getActionCommand() == "Gyro") {
            // manually add pita (which is tracked in inventory) with gyro types
            orderItems.add("Pita");
        } else {
            JOptionPane.showMessageDialog(null, "Please select a rice choice!");
            return;
        }

        // check protein selection
        if (proteins.getSelection() != null) {
            // only add to array if an actual protein option is selected
            // "No protein" is not an item in the inventory, so we don't want to try and add it
            if (proteins.getSelection().getActionCommand() != "No protein") {
                orderItems.add(proteins.getSelection().getActionCommand());
            }
        } else {
            JOptionPane.showMessageDialog(null, "Please select a protein choice!");
            return;
        }

        // add toppings selection
        for (int i = 0; i < toppings.size(); i++) {
            if (toppings.get(i).isSelected()) {
                orderItems.add(toppings.get(i).getActionCommand());
            }
        }

        // check dressing selection
        if (dressings.getSelection() != null) {
            // only add to array if an actual protein option is selected
            // "No dressing" is not an item in the inventory, so we don't want to try and add it
            if (dressings.getSelection().getActionCommand() != "No dressing") {
                orderItems.add(dressings.getSelection().getActionCommand());
            }
        } else {
            JOptionPane.showMessageDialog(null, "Please select a dressing choice!");
            return;
        }

        // add sides selection
        for (int i = 0; i < sides.size(); i++) {
            if (sides.get(i).isSelected()) {
                orderItems.add(sides.get(i).getActionCommand());
            }
        }

        // add all the extras to a different array
        for (int i = 0; i < extras.size(); i++) {
            if (extras.get(i).isSelected()) {
                // can't have extra protein when no protein is selected as the choice
                if (extras.get(i).getActionCommand() == "Extra Protein") {
                    if (proteins.getSelection().getActionCommand() != "No protein") {
                        extraItems.add(extras.get(i).getActionCommand());
                    } else {
                        JOptionPane.showMessageDialog(null, "Cannot add extra protein with no protein choice selected!");
                        return;
                    }
                }

                // can't have extra dressing when no dressing is selected as the choice
                if (extras.get(i).getActionCommand() == "Extra Dressing") {
                    if (dressings.getSelection().getActionCommand() != "No dressing") {
                        extraItems.add(extras.get(i).getActionCommand());
                    } else {
                        JOptionPane.showMessageDialog(null, "Cannot add extra dressing with no dressing choice selected!");
                        return;
                    }
                }
            }
        }

        new reviewOrder(conn, placeOrderFrame, orderItems, extraItems, employeeFirst, employeeLast);
        placeOrderFrame.setVisible(false);
    }

    /**
     * @param e     Button Press
     */

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == orderReviewButton) {
            orderItems.clear();
            sendToReviewOrder();
        }

        if (e.getSource() == backButton) {
            placeOrderFrame.setVisible(false);
            options.createOrderFrame.setVisible(true);
        }
    }
}
