import { useState } from "react";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ExcessReport() {
    const [isLoading, setIsLoading] = useState(false);
    const [excessItems, setExcessItems] = useState([{}]);

    function handleSubmit(e) {
        e.preventDefault();

        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;

        if(start === '' || end === ''){
            alert("Please enter all the fields")
        } 
        else if (start > end) {
            alert("Invalid Dates")
        }
        else {
            setIsLoading(true);
            fetch("/api/excessReport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ start: start, end: end })
            })
                .then(res => res.json())
                .then(excessItems => {
                    setIsLoading(false);
                    setExcessItems(excessItems.excessItems);
                });
        }
    }

    return (
        <div className="excessReport-container">
            <Modal isVisible={isLoading} body={ <LoadingSpinner /> } />
            <form className="expressReport-form" onSubmit={handleSubmit}>
                <h1>Excess Report</h1>
                <div className="excess-report-input">
                        <label htmlFor="start">Enter the start date:</label>
                        <input type="date" id="start" name="start" />
                </div>

                <div className="excess-report-input">
                    <label htmlFor="end">Enter the end date:</label>
                    <input type="date" id="end" name="end" />
                </div>

                <div className="excess-report-buttons">
                    <button type = "submit"> Generate Excess Report </button>
                    <button type = "button" onClick={() => {
                        console.log(excessItems);
                        setExcessItems([])
                    }}> Clear Excess Report </button>
                </div>
            </form>
            
            <table className="excessReport-table">
                <thead>
                    <tr>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                {
                        excessItems.map((item, i) => (
                            <tr key={i}>
                                <td>{item.product_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
        
    );
}
