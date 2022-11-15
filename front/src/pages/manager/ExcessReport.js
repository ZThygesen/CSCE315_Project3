import { useEffect, useState } from "react";
// import DatePicker from 'react-date-picker';

export default function ExcessReport() {

    const [excessReport, setExcessReport] = useState([{}]);

    useEffect(() => {
        fetch("/api/excessReport")
            .then(res => res.json())
            .then(excessReport => setExcessReport(excessReport.excessReport));
    }, []);

    return (
        <div className="excessReport-container">
            <h1>Excess Report</h1>
            <table className="excessReport-table">
                <thead>
                    <tr>
                        <th>Item</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        excessReport.map((item, i) => (
                            <tr key={i}>
                                <td>{item.product_name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {/* <PickDate /> */}
        </div>
        
    );
}



// function PickDate() {
//     const [startDate, setStartDate] = useState(new Date());
//     const [endDate, setEndDate] = useState(null);
//     const onChange = (dates) => {
//         const [start, end] = dates;
//         setStartDate(start);
//         setEndDate(end);
//     }
//     console.log('start date: ' + startDate + 'end date: ' + endDate)
//     return (
//       <>
//         <DatePicker 
//         selected = {startDate}
//         onChange = {onChange}
//         startDate = {startDate}
//         endDate = {endDate}
//         selectsRange
//         inline
//         />
//       </>
//     );
//   }