import javax.swing.*;
import manager.managerGUI;
import server.serverGUI;
import java.sql.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.*;
import java.awt.GridLayout;

/**
 * @author Zach Thygesen
 * 
 * Main screen to select if user is a server or manager.
 */
public class systemGUI implements ActionListener {
    // Create database connection variable; this is passed to all files that need a connection
    Connection conn;

    // Mode Selection Window
    JFrame modeSelectFrame = new JFrame();
    JButton serverButton = new JButton("Server");
    JButton managerButton = new JButton("Manager");
    JPanel modeSelectPanel = new JPanel();

    /**
     * Constructor for systemGUI screen 
     * @throw Exception if command can't be executed successfully
     */

    systemGUI() {
        // Create database connection for current session
        try {
            Class.forName("org.postgresql.Driver");
            conn = DriverManager.getConnection("jdbc:postgresql://csce-315-db.engr.tamu.edu/csce315_903_12",
                    dbSetup.user, dbSetup.pswd);
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getClass().getName() + ": " + e.getMessage());
            System.exit(0);
        }

        // Add mode selection buttons
        //serverButton.setBounds(100, 160, 200, 40);
        serverButton.setFocusable(false);
        serverButton.addActionListener(this);
        serverButton.setFont(new Font("Monospace", Font.BOLD, 40));

        //managerButton.setBounds(100, 160, 200, 40);
        managerButton.setFocusable(false);
        managerButton.addActionListener(this);
        managerButton.setFont(new Font("Monospace", Font.BOLD, 40));

        modeSelectFrame.add(serverButton);
        modeSelectFrame.add(managerButton);

        modeSelectFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        modeSelectFrame.setSize(1280, 720);
        modeSelectFrame.setLayout(new GridLayout(2,1));
        modeSelectFrame.setLocationRelativeTo(null);
        modeSelectFrame.setVisible(true);
    }

    /**
     * @param e     Button Press
     */

    public void actionPerformed(ActionEvent e) {

        if (e.getSource() == serverButton) {
            modeSelectFrame.setVisible(false);
            new serverGUI(conn);
        }

        // opens up manager GUI
        if (e.getSource() == managerButton) {
            modeSelectFrame.setVisible(false);
            new managerGUI(conn);
        }
    }

    /**
     * main creates new instance of systemGUI
     * @param args
     */
    public static void main(String[] args) {
        // Launches new order window
        new systemGUI();
    }
}
