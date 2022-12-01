import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * @description This provides the manager the ability to add an item to the inventory
 * @author Zach, Ardian
 * @returns Add Inventory Page
 */
export default function AddInventory() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [submission, setSubmission] = useState(false);
    const [submissionMsg, setSubmissionMsg] = useState("");

    /**
     * @description This handles the functionality for when the user presses the submit button and will send the information for 
     * the new item to the server. It then gets the confirmation from the server to display to the user
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        const temp = uuid();
        const id = temp.toString();

        var selection = document.getElementById("type");
        const type = selection.options[selection.selectedIndex].value;

        const name = document.getElementById("name").value;
        const quantity = document.getElementById("quan").value;
        const serve = document.getElementById("serve").value;
        const minimum = document.getElementById("min").value;

        setIsLoading(true);
        fetch("/api/add-inv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, id: id, quantity: quantity, type: type, serve: serve, onhand: minimum })
        })
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                setSubmissionMsg(res);
                setSubmission(true);
            });
    }

    /**
     * @description This handles the modal that appears when the user presses submit, confirming that the
     * action worked
     * @returns Submission Modal
     */
    function SubmissionModal() {
        return (
            <Modal isVisible={submission}
                body={
                    <p>{submissionMsg}</p>
                }
                footer={
                    <button
                        className="modal-close-button"
                        onClick={() => {
                            setSubmission(current => !current);
                            setSubmissionMsg("");
                            navigate(-1);
                        }}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    return (
        <div className="add-inventory-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <SubmissionModal />
            <h1>Add Inventory</h1>
            {/* Where user enters information on new item */}
            <form className="add-inventory-form" onSubmit={handleSubmit}>
                <div className="add-inventory-input">
                    <label htmlFor="name">Enter the new item name:</label>
                    <input type="text" id="name" name="name" required/>
                </div>

                <div className="add-inventory-input">
                    <label htmlFor="quan">Enter the quantity:</label>
                    <input type="number" id="quan" name="quan" required/>
                </div>

                <div className="add-inventory-input">
                    <label htmlFor="type">
                        Choose a product type:
                    </label>
                    <select id="type">
                        <option value="Pita">Pita</option>
                        <option value="Rice">Rice</option>
                        <option value="Protein">Protein</option>
                        <option value="Topping">Topping</option>
                        <option value="Dressing">Dressing</option>
                        <option value="Side">Side</option>
                    </select>
                </div>

                <div className="add-inventory-input">
                    <label htmlFor="serve">Enter the serving size:</label>
                    <input type="number" id="serve" name="serve" required/>
                </div>

                <div className="add-inventory-input">
                    <label htmlFor="min">Enter the minimum required amount:</label>
                    <input type="number" id="min" name="min" required/>
                </div>

                <div className="add-inventory-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" value="Submit">Add Item</button>
                </div>
            </form>
        </div>
    );
}
