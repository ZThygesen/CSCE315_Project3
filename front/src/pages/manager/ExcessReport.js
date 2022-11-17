import { useState } from "react";

export default function ExcessReport() {

    var [excessItems, setExcessItems] = useState([{}]);

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

            fetch("/api/excessReport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ start: start, end: end })
            })
                .then(res => res.json())
                .then(excessItems => {
                    setExcessItems(excessItems.excessItems)
                    console.log(excessItems)
                });
        }
    }

    return (
        <div className="excessReport-container">
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