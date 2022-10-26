package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * @author Zach Thygesen
 * 
 * Main screen for manager-side GUI. Includes
 * Inventory, several report, and logout options.
 */
public class managerGUI implements ActionListener {
    Connection conn;
    JFrame modeSelectFrame;

    // Manager main window contents
    static JFrame managerMainFrame = new JFrame();

    JButton inventoryButton = new JButton("Inventory");
    JButton salesReportButton = new JButton("Sales Report");
    JButton excessReportButton = new JButton("Excess Report");
    JButton restockReportButton = new JButton("Restock Report");
    JButton logoutButton = new JButton("Logout");

    JPanel mainPanel = new JPanel();

    /**
     * Creates the elements of the main manager GUI
     * 
     * @param conn Passes database connection
     */
    
    public managerGUI(Connection conn) {
        this.conn = conn;

        // Add the button options
        inventoryButton.setBounds(100, 160, 200, 40);
        inventoryButton.setFocusable(false);
        inventoryButton.addActionListener(this);

        salesReportButton.setBounds(100, 160, 200, 40);
        salesReportButton.setFocusable(false);
        salesReportButton.addActionListener(this);

        excessReportButton.setBounds(100, 160, 200, 40);
        excessReportButton.setFocusable(false);
        excessReportButton.addActionListener(this);

        restockReportButton.setBounds(100, 160, 200, 40);
        restockReportButton.setFocusable(false);
        restockReportButton.addActionListener(this);

        logoutButton.setBounds(100, 160, 200, 40);
        logoutButton.setFocusable(false);
        logoutButton.addActionListener(this);

        // Add everything to the main frame
        mainPanel.setBounds(540, 200, 200, 200);
        mainPanel.add(inventoryButton);
        mainPanel.add(salesReportButton);
        mainPanel.add(excessReportButton);
        mainPanel.add(restockReportButton);
        mainPanel.add(logoutButton);

        managerMainFrame.add(mainPanel);

        managerMainFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        managerMainFrame.setSize(1280, 720);
        managerMainFrame.setLayout(null);
        managerMainFrame.setLocationRelativeTo(null);
        managerMainFrame.setVisible(true);
    }

    /**
     * Switches between frames when buttons are pressed
     * 
     * @param e Button press
     */
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == inventoryButton) {
            managerMainFrame.setVisible(false);
            new showInventory(conn);
        }

        if (e.getSource() == salesReportButton) {
            managerMainFrame.setVisible(false);
            new salesReport(conn);
        }

        if (e.getSource() == excessReportButton) {
            managerMainFrame.setVisible(false);
            new excessReport(conn);
        }

        if (e.getSource() == restockReportButton) {
            managerMainFrame.setVisible(false);
            new restockReport(conn);
        }

        if (e.getSource() == logoutButton) {
            JOptionPane.showMessageDialog(null, "Signed Out!");
            System.exit(0);
        }
    }
}
