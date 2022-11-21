import { useState } from "react";
import DatePicker from "react-date-picker";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function SalesReport() {
    const [isLoading, setIsLoading] = useState(false);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [dateErr, setDateErr] = useState(false);

    const [items, setItems] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();

        if (startDate > endDate) {
            setDateErr(true);
            return;
        }

        setItems([]);

        setIsLoading(true);
        fetch("/api/sales-report", {
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
        <div className="sales-report-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <DateErrModal />
            <form className="sales-report-form" onSubmit={handleSubmit}>
                <h1>Sales Report</h1>
                <div className="sales-report-date-pickers">
                    <div className="sales-report-input">
                        <div className="start-date">
                            Start Date
                        </div>
                        <DatePicker
                            value={startDate}
                            onChange={date => setStartDate(date)}
                            clearIcon={null}
                        />
                    </div>
                    <div className="sales-report-input">
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

                <div className="sales-report-buttons">
                    <button type= "submit">Generate Report</button>
                    <button type="button" onClick={() => {
                        setItems([])
                    }}>Clear</button>
                </div>
            </form>
            {items.length === 0 ? <div>No sales for the defined time period.</div> :
                <table className="sales-report-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Total Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            items.map((item, i) => (
                                <tr key={i}>
                                    <td>{item.product_name}</td>
                                    <td>{item.total_servings}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            }
        </div>   
    );
}
