package manager;
import javax.swing.*;
import java.sql.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Calendar;

/**
 * @author Zach Thygesen
 * Generates sales report given a start and end date.
 */
public class salesReport implements ActionListener {
    Connection conn;

    JFrame salesReportFrame = new JFrame();
    JPanel datePickers = new JPanel();
    JPanel dates = new JPanel();
    JPanel startDate = new JPanel();
    JPanel endDate = new JPanel();
    JPanel report = new JPanel();

    JButton submitButton = new JButton("Generate Sales Report");
    JButton backButton = new JButton("Back");

    JComboBox<String> startDay;
    JComboBox<String> startMonth;
    JComboBox<String> startYear;
    JComboBox<String> endDay;
    JComboBox<String> endMonth;
    JComboBox<String> endYear;

    /**
     * Generates sales report given a start and end date
     * 
     * @param conn      Passes database connection
     */

    salesReport(Connection conn) {
        this.conn = conn;

        backButton.addActionListener(this);
        submitButton.addActionListener(this);
        submitButton.setAlignmentX(Component.CENTER_ALIGNMENT);

        generateDatePicker(startDate, "Start Date");
        generateDatePicker(endDate, "End Date");

        dates.add(startDate);
        dates.add(endDate);
        dates.setLayout(new BoxLayout(dates, BoxLayout.X_AXIS));

        datePickers.add(dates);
        datePickers.add(submitButton);
        datePickers.setLayout(new BoxLayout(datePickers, BoxLayout.Y_AXIS));

        salesReportFrame.add(datePickers, BorderLayout.NORTH);
        salesReportFrame.add(report, BorderLayout.CENTER);
        salesReportFrame.add(backButton, BorderLayout.SOUTH);
        salesReportFrame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        salesReportFrame.setSize(1280, 720);
        salesReportFrame.setLocationRelativeTo(null);
        salesReportFrame.setVisible(true);
    }

    /**
     * 
     * @param panel         Retrieves JPanel to select the month, date, year for sales report
     * @param panelName     Name of panel used to add JLabel (Start Date or End Date)
     */

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
     * Generation of the sales report.Uses start and end dates
     * to retrieve sales numbers from the database and display in GUI.
     * 
     * @param conn  Passes database connection
     */ 

    public void generateReport(Connection conn) {
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
            return;
        }

        String items = "Item\n";
        String totalServings = "Total Sales\n";
        try {
            Statement stmt = conn.createStatement();

            String sqlStatement = "SELECT inventory.product_name, COUNT(*) AS total_servings FROM inventory, order_product, orders " +
                    "WHERE inventory.product_id = order_product.product_id AND orders.order_id = order_product.order_id AND orders.order_date BETWEEN " +
                    "'" + start + "' AND '" + end + "' GROUP BY inventory.product_name, order_product.product_id";


            ResultSet result = stmt.executeQuery(sqlStatement);
            while (result.next()) {
                items += result.getString("product_name") + "\n";
                totalServings += result.getString("total_servings") + "\n";
            }
        } catch (Exception e) {
            JOptionPane.showMessageDialog(null, "Error accessing Database.");
        }

        JTextArea listItems = new JTextArea(items);
        JTextArea listServings = new JTextArea(totalServings);

        report.removeAll();

        report.add(listItems);
        report.add(listServings);

        report.validate();
        report.repaint();
    }

    /**
     * @param e Button Press
     */

    public void actionPerformed(ActionEvent e) {
        if (e.getSource() == submitButton) {
            generateReport(conn);
        }

        if (e.getSource() == backButton) {
            managerGUI.managerMainFrame.setVisible(true);
            salesReportFrame.setVisible(false);
        }
    }
}
