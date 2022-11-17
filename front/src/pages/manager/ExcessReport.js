import { useState } from "react";

var whattest = [];
export default function ExcessReport() {

    const [excessReport, setExcessReport] = useState([{}]);

    function handleSubmit(e) {
        e.preventDefault();

        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;

        console.log(excessReport)

        if(start === '' || end === ''){
            alert("Please enter all the fields")
        } else {

            fetch("/api/excessReport", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ start: start, end: end })
            })
                .then(res => res.json())
                .then(excessReport => {
                    setExcessReport(excessReport.excessReport)
                    getExcess(excessReport);
                });
        }
    }

    function getExcess(item) {
        console.log(item)
        item.map((element, i) => {
            var numItemsSold = Number(element.total_servings) * element.serving_size;
            if ((numItemsSold / (element.total_quantity + numItemsSold)) < 0.1) {
                console.log("ITEM INFO: " + element.product_name + (numItemsSold / (element.total_quantity + numItemsSold)));
                whattest.push(element.product_name);
                
            }
            return whattest;
        }, {});
        
        console.log(whattest);
    }

    return (
        <div className="excessReport-container">
            <form className="expressReport-form" onSubmit={handleSubmit}>
                <h1>Excess Report</h1>
                <div className="excess-report-input">
                        <label htmlFor="start">Enter the start date:</label>
                        <input type="date" id="start" name="start" value="2022-09-06" />
                </div>

                <div className="excess-report-input">
                    <label htmlFor="end">Enter the end date:</label>
                    <input type="date" id="end" name="end" value="2022-09-10"/>
                </div>

                <div className="excess-report-buttons">
                    <button type = "submit"> Generate Excess Report </button>
                    <button type = "button" onClick={() => {
                        whattest = [];
                        console.log(whattest);
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
                        whattest.map(item => {
                            return (
                                <tr key = {item.product_name}>
                                    <td>{item}</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </table>
        </div>
        
    );
}