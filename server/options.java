package server;
import javax.swing.*;
import java.sql.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.GridLayout;
import java.awt.Font;

/**
 * @author Justin Heger
 * Provides screen after server logs in to create an order or log back out.
 */
public class options implements ActionListener {
    Connection conn;
    String firstname;
    String lastname;

    // create order window contents
    static JFrame createOrderFrame = new JFrame();
    static JButton createOrderButton = new JButton("Create Order");
    static JButton logoutButton = new JButton("Logout");

    static JPanel createOrderPanel = new JPanel();
    /**
     * Constructor for options screen shows the create order and logout buttons
     * 
     * @param conn          Passes database connection
     * @param firstname     Uses employee firstname from verification to add to employee_ID of orders table
     * @param lastname      Uses employee lastname from verification to add to employee_ID of orders table
     */

    public options(Connection conn, String firstname, String lastname) {
        this.conn = conn;
        this.firstname = firstname;
        this.lastname = lastname;

        createOrderButton.setFont(new Font("Monospace", Font.BOLD, 40));
        createOrderButton.setFocusable(false);
        createOrderButton.addActionListener(this);

        logoutButton.setFont(new Font("Monospace", Font.BOLD, 40));
        logoutButton.setBounds(100, 160, 200, 40);
        logoutButton.setFocusable(false);
        logoutButton.addActionListener(this);
        
        createOrderPanel.add(createOrderButton);
        createOrderPanel.add(logoutButton);
        createOrderFrame.add(createOrderPanel);
        createOrderPanel.setLayout(new GridLayout(2,1));

        createOrderFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        createOrderFrame.setSize(1280, 720);
        createOrderFrame.setLayout(new GridLayout(1,1));
        createOrderFrame.setLocationRelativeTo(null);
        createOrderFrame.setVisible(true);
    }

    /**
     * @param e     Button Press
     */
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == createOrderButton) {
            createOrderFrame.setVisible(false);
            new createOrder(conn, firstname, lastname);
        }

        if (e.getSource() == logoutButton) {
            JOptionPane.showMessageDialog(null, "Signed Out!");
            System.exit(0);
        }
    } 

}

