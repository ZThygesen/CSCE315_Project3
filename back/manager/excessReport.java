package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Calendar;

/**
 * @author Zach Thygesen
 * 
 * Generates excess report
 */
public class excessReport implements ActionListener {
    JFrame excessReportFrame = new JFrame();

    //Start and End Dates
    JPanel datePanel = new JPanel();
    JPanel startDatePanel = new JPanel();
    JPanel endDatePanel = new JPanel();

    JComboBox<String> startDay;
    JComboBox<String> startMonth;
    JComboBox<String> startYear;
    JComboBox<String> endDay;
    JComboBox<String> endMonth;
    JComboBox<String> endYear;

    TextArea report = new TextArea();

    JButton backButton = new JButton("Back");
    JButton generateReport = new JButton("Generate Excess Report");
    /**
     * generates excess report
     * 
     * @param conn Passes database connection
     */
    excessReport(Connection conn) {
        generateDatePicker(startDatePanel, "Start Date");
        generateDatePicker(endDatePanel, "End Date");

        datePanel.add(startDatePanel);
        datePanel.add(endDatePanel);

        excessReportFrame.add(datePanel);
        excessReportFrame.add(report);
        excessReportFrame.add(generateReport);
        excessReportFrame.add(backButton);
        
        backButton.addActionListener(this);
        generateReport.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e){
                report.setText(generateExcessReport(conn));

                report.validate();
                report.repaint();
            }
        });

        excessReportFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        excessReportFrame.setSize(1280, 720);
        excessReportFrame.setLayout(new GridLayout(5, 0));
        excessReportFrame.setLocationRelativeTo(null);
        excessReportFrame.setVisible(true);
    }

    public void generateDatePicker(JPanel panel, String panelName) {
        String days[];
        days = new String[32];
        for (int i = 1; i <= 31; i++) {
            days[i] = Integer.toString(i);
        }
        JPanel dayPanel = new JPanel();
        JComboBox<String> dayOpts = new JComboBox<String>(days);
        dayPanel.add(new JLabel("Day"));
        dayPanel.add(dayOpts);
        dayPanel.setLayout(new BoxLayout(dayPanel, BoxLayout.Y_AXIS));

        String months[];
        months = new String[13];
        for (int i = 1; i <= 12; i++) {
            months[i] = Integer.toString(i);
        }
        JPanel monthPanel = new JPanel();
        JComboBox<String> monthOpts = new JComboBox<String>(months);
        monthPanel.add(new JLabel("Month"));
        monthPanel.add(monthOpts);
        monthPanel.setLayout(new BoxLayout(monthPanel, BoxLayout.Y_AXIS));

        String years[] = { "2022", "2023" };
        JPanel yearPanel = new JPanel();
        JComboBox<String> yearOpts = new JComboBox<String>(years);
        yearPanel.add(new JLabel("Year"));
        yearPanel.add(yearOpts);
        yearPanel.setLayout(new BoxLayout(yearPanel, BoxLayout.Y_AXIS));

        panel.add(new JLabel(panelName));
        panel.add(monthPanel);
        panel.add(dayPanel);
        panel.add(yearPanel);

        if (panelName == "Start Date") {
            startDay = dayOpts;
            startMonth = monthOpts;
            startYear = yearOpts;
        } else {
            endDay = dayOpts;
            endMonth = monthOpts;
            endYear = yearOpts;
        }
    }

    /**
     * Generates excess report
     * 
     * @param conn  Passes database connection
     * @return      Returns list of excess items for excess report
     */
    public String generateExcessReport(Connection conn) {
        //Gets start and end dates from user input
        java.sql.Date start;
        java.sql.Date end;
        try {
            Calendar calStart = Calendar.getInstance();
            calStart.set(Integer.valueOf((String) startYear.getSelectedItem()),
                    Integer.valueOf((String) startMonth.getSelectedItem()) - 1,
                    Integer.valueOf((String) startDay.getSelectedItem()));

            Calendar calEnd = Calendar.getInstance();
            calEnd.set(Integer.valueOf((String) endYear.getSelectedItem()),
                    Integer.valueOf((String) endMonth.getSelectedItem()) - 1,
                    Integer.valueOf((String) endDay.getSelectedItem()));
            
            start = new java.sql.Date(calStart.getTimeInMillis());
            end = new java.sql.Date(calEnd.getTimeInMillis());
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Incorrect date entered.");
            return "Invalid Date Range";
        }

        //Gets items that are in excess
        String listOfExcessItems = "";

        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT inventory.product_name, COUNT(*) AS total_servings, inventory.total_quantity, inventory.serving_size FROM inventory, order_product, orders WHERE inventory.product_id = order_product.product_id AND orders.order_id = order_product.order_id AND orders.order_date BETWEEN '" + 
                                    start + "' AND '" + end + "' GROUP BY inventory.product_name, inventory.total_quantity, inventory.serving_size";
            System.out.println(sqlStatement);

            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                Double numItemsSold = Double.parseDouble(result.getString("total_servings")) * Double.parseDouble(result.getString("serving_size"));

                if((numItemsSold / (Double.parseDouble(result.getString("total_quantity"))+numItemsSold)) < 0.1){
                    listOfExcessItems += result.getString("product_name") + "\n";
                }
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        return listOfExcessItems;
    }

    /**
     * @param e Button press
     */
    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == backButton) {
            managerGUI.managerMainFrame.setVisible(true);
            excessReportFrame.setVisible(false);
        }
    }
}
