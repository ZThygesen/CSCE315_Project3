package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

/**
 * @author Zach Thygesen
 * Generates a restock report
 */
public class restockReport implements ActionListener {
    JFrame restockReportFrame = new JFrame();

    JButton backButton = new JButton("Back");

     /**
      * Generates a restock report
      *
      * @param conn     Passes connection from database
      */

    restockReport(Connection conn) {

        String restock = "";

        try {
            Statement stmt = conn.createStatement();

            String sqlState = "SELECT * FROM inventory";

            ResultSet result = stmt.executeQuery(sqlState);

            while(result.next()){
                Double onHand = Double.parseDouble(result.getString("min_quantity"));
                Double currInv = Double.parseDouble(result.getString("total_quantity"));

                if(currInv < onHand){
                    restock += result.getString("product_name") + "\n";
                }
            }
        } catch (Exception er) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
            er.printStackTrace();
        }

        TextArea report = new TextArea(restock);

        restockReportFrame.add(report);
        restockReportFrame.add(backButton);
        backButton.addActionListener(this);

        restockReportFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        restockReportFrame.setSize(1280, 720);
        restockReportFrame.setLayout(new GridLayout(5, 0));
        restockReportFrame.setLocationRelativeTo(null);
        restockReportFrame.setVisible(true);
    }

    /**
     * @param e     Button press
     */

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == backButton) {
            managerGUI.managerMainFrame.setVisible(true);
            restockReportFrame.setVisible(false);
        }
    }
}
