package server;
import javax.swing.*;
import java.sql.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.Font;
import java.awt.GridLayout;
import java.util.*;

/**
 * @author Zach Thygesen
 * @author Justin Heger
 * 
 * Login screen for server to verify employee information.
 */
public class serverGUI implements ActionListener {
    Connection conn;

    // Employee Login Window
    JFrame serverLoginFrame = new JFrame();
    JTextField serverFirstnameField;
    JTextField serverLastnameField;
    JTextField firstnameField;
    JTextField lastnameField;
    JLabel firstnameLabel;
    JLabel lastnameLabel;
    JButton serverLoginButton = new JButton("Login");
    JPanel firstnameLoginPanel = new JPanel();
    JPanel lastnameLoginPanel = new JPanel();
    JPanel serverLoginPanel = new JPanel();

    /**
     * Constructor for server-side GUI
     * 
     * @param conn  Passes database connection
     */

    public serverGUI(Connection conn) {
        this.conn = conn;

        // Settings for server login window
        serverLoginButton.addActionListener(this);
        serverLoginButton.setFont(new Font("Arial", Font.BOLD, 40));

        serverFirstnameField = new JTextField();
        serverFirstnameField.setFont(new Font("Monospace", Font.PLAIN, 20));

        serverLastnameField = new JTextField();
        serverLastnameField.setFont(new Font("Monospace", Font.PLAIN, 20));

        JLabel lblfirstname = new JLabel("Employee Server Firstname:");
        lblfirstname.setFont(new Font("Monospace", Font.BOLD, 25));
        firstnameLoginPanel.add(lblfirstname);
        firstnameLoginPanel.add(serverFirstnameField);
        firstnameLoginPanel.setLayout(new GridLayout(2,0));

        JLabel lbllastname = new JLabel("Employee Server Lastname:");
        lbllastname.setFont(new Font("Monospace", Font.BOLD, 25));
        lastnameLoginPanel.add(lbllastname);
        lastnameLoginPanel.add(serverLastnameField);
        lastnameLoginPanel.setLayout(new GridLayout(2,0));

        serverLoginPanel.add(serverLoginButton);
        serverLoginPanel.setBounds(200, 200, 200, 200);

        serverLoginFrame.add(firstnameLoginPanel);
        serverLoginFrame.add(lastnameLoginPanel);
        serverLoginFrame.add(serverLoginButton);

        serverLoginFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        serverLoginFrame.setSize(1280, 720);
        serverLoginFrame.setLayout(new GridLayout(3,0,0,100));
        serverLoginFrame.setLocationRelativeTo(null);
        serverLoginFrame.setVisible(true);
    }

    /**
     * Verifies server's login information to ensure they 
     * actually work at Pom and Honey.
     * 
     * @param firstname     Uses given firstname to verify if employee in database
     * @param lastname      Uses given lastname to verify if employee in database
     */

    public void verifyServer(String firstname, String lastname) {
        ArrayList<String> employeeFirst = new ArrayList<String>();
        ArrayList<String> employeeLast = new ArrayList<String>();
        
        try {
            Statement stmt = conn.createStatement();
            String sqlStatement = "SELECT * FROM employees";
            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                employeeFirst.add(result.getString("firstname"));
                employeeLast.add(result.getString("lastname"));
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            e.printStackTrace();
        }

        Boolean employeeExists = false;

        for (int i = 0; i < employeeFirst.size(); i++) {
            if (employeeFirst.get(i).equals(firstname) && employeeLast.get(i).equals(lastname)) {
                employeeExists = true;
            }
        }

        if (employeeExists == true) {
            JOptionPane.showMessageDialog(null, "Welcome " + firstname + " " + lastname + "! Logging you in...");
            new options(conn, firstname, lastname);
            serverLoginFrame.setVisible(false);
  
        } else {
            JOptionPane.showMessageDialog(null, "Employee does not exist in the system!");
        }

    }

    /**
     * @param e     Button Press
     */
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == serverLoginButton) {
            String firstname = serverFirstnameField.getText();
            String lastname = serverLastnameField.getText();

            // Verification for employee name
            verifyServer(firstname, lastname);
        }
    } 
}
