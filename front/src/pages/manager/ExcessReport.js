import { useEffect, useState } from "react";

var whattest = [];
export default function ExcessReport() {

    const [excessReport, setExcessReport] = useState([{}]);

    // useEffect(() => {
    //     fetch("/api/excessReport")
    //         .then(res => res.json())
    //         .then(excessReport => setExcessReport(excessReport.excessReport));
            
    // }, []);

    function handleSubmit() {
        //e.preventDefault();

        // const startDate = document.getElementById("start").value;
        // const endDate = document.getElementById("end").value;
        const start = "2022-10-16";
        const end = "2022-12-05"; 

        if(start === '' || end === ''){
            alert("Please enter all the fields")
        } else {

            fetch("/api/excessReport", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ start: start, end: end})
            })
                .then(res => res.json())
                .then(excessReport => setExcessReport(excessReport.excessReport))
            
            alert("Update sent");
        }
    }

    function getExcess(item) {
        for (let i = 0; i < item.length; i++) {
            var numItemsSold = Number(item[i].total_servings) * item[i].serving_size;
            if ((numItemsSold / (item[i].total_quantity+numItemsSold)) < 0.1) {
                
                whattest.push(item[i].product_name);
            }
            
        }
        
        console.log(whattest);
        return whattest;
    }
    function dualFunction() {
        handleSubmit();
        getExcess(excessReport);   
    }
    return (
        <div className="excessReport-container">
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
                <button onClick={() => {
                    dualFunction();
                }}> Generate Excess Report </button>
            </div>
            
            <table className="excessReport-table">
                <thead>
                    <tr>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {/* {
                        whattest.map(item => {
                            return (
                                <tr key = {item.product_name}>
                                    <td>[item.product_name</td>
                                </tr>
                            );
                        })
                    } */}
                </tbody>
            </table>
        </div>
        
    );
}