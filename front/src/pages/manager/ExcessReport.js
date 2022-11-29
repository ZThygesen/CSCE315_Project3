import { useState } from "react";
import DatePicker from "react-date-picker";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * This provides a report of items that have sold less than 10% of its inventory within a time frame
 * @author Justin
 * @returns Excess Report Page
 */
export default function ExcessReport() {
    const [isLoading, setIsLoading] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [dateErr, setDateErr] = useState(false);

    const [items, setItems] = useState([]);

    /**
     * This gets the start and end dates specified by the user and sends it to the server when the user presses the submit button.
     * It then gets the items and other information from the server to display to the user
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();

        if (startDate > endDate) {
            setDateErr(true);
            return;
        }

        setItems([]);

        setIsLoading(true);
        fetch("/api/excess-report", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ start: startDate, end: endDate })
        })
            .then(res => res.json())
            .then(items => {
                setIsLoading(false);
                setItems(items.items);
            });
    }

    /**
     * This function handles the situation where the user enters a start date that comes after the end date
     * @returns Data Error Modal
     */
    function DateErrModal() {
        return (
            <Modal isVisible={dateErr}
                body={
                    <p>Start date cannot be after end date</p>
                }
                footer={
                    <button
                        className="modal-close-button"
                        onClick={() => {
                            setDateErr(current => !current);
                        }}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    return (
        <div className="excess-report-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <DateErrModal />
            <form className="express-report-form" onSubmit={handleSubmit}>
                <h1>Excess Report</h1>
                <div className="excess-report-date-pickers">
                    <div className="excess-report-input">
                        <div className="start-date">
                            Start Date
                        </div>
                        <DatePicker
                            value={startDate}
                            onChange={date => setStartDate(date)}
                            clearIcon={null}
                        />
                    </div>
                    <div className="excess-report-input">
                        <div className="end-date">
                            End Date
                        </div>
                        <DatePicker
                            value={endDate}
                            onChange={date => setEndDate(date)}
                            clearIcon={null}
                        />
                    </div>
                </div>

                <div className="excess-report-buttons">
                    <button type="submit">Generate Report</button>
                    <button type="button" onClick={() => {
                        setItems([])
                    }}>Clear</button>
                </div>
            </form>
            {items.length === 0 ? <div>No items in excess for the defined time period.</div> :
                <table className="excess-report-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.product_name}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div> 
    );
}
