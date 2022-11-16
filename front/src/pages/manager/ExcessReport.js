import { useState } from "react";

var whattest = [];
export default function ExcessReport() {

    const [excessReport, setExcessReport] = useState([{}]);

    function handleSubmit(e) {
        e.preventDefault();

        const start = document.getElementById("start").value;
        const end = document.getElementById("end").value;
        //var start = '2022-10-16';
        //var end ='2022-12-05'; 
        console.log("here")

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
                    setExcessReport(excessReport.excessReport);
                    getExcess(excessReport);  
                });
        }
    }

    function getExcess(item) {
        whattest = [];
        for (let i = 0; i < item.length; i++) {
            var numItemsSold = Number(item[i].total_servings) * item[i].serving_size;
            if ((numItemsSold / (item[i].total_quantity + numItemsSold)) < 0.1) {
                console.log("ITEM INFO: " + item[i].product_name + (numItemsSold / (item[i].total_quantity + numItemsSold)));
                whattest.push(item[i].product_name);
            }
            
        }
        
        console.log(whattest);
        return whattest;
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