import { useState } from "react";
import { useNavigate } from "react-router-dom";
import uuid from 'react-uuid';
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * This provides the manager the ability to add an item to the menu
 * @author Zach, Ardian
 * @returns Add Menu Page
 */
export default function AddMenu() {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [submission, setSubmission] = useState(false);
    const [submissionMsg, setSubmissionMsg] = useState("");

    /**
     * This handles the functionality for when the user presses the submit button and will send the information for 
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
        const price = document.getElementById("price").value;
        const calorie = document.getElementById("cal").value;

        setIsLoading(true);
        fetch("/api/add-menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name: name, id: id, type: type, price: price, cal: calorie })
        })
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                setSubmissionMsg(res);
                setSubmission(true);
            });
    }   

    /**
     * This handles the modal that appears when the user presses submit, confirming that the
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
        <div className="add-menu-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <SubmissionModal />
            <h1>Add Menu</h1>
            {/* Where user enters information on new item */}
            <form className="add-menu-form" onSubmit={handleSubmit}>
                <div className="add-menu-input">
                    <label htmlFor="name">Enter the new menu item name:</label>
                    <input type="text" id="name" name="name" required/>
                </div>

                <div className="add-menu-input">
                    <label htmlFor="type">
                        Choose a product type:
                    </label>
                    <select id="type">
                        <option value="Type">Type</option>
                        <option value="Side">Side</option>
                        <option value="Extra">Extra</option>
                    </select>
                </div>

                <div className="add-menu-input">
                    <label htmlFor="price">Enter the menu price:</label>
                    <input type="text" id="price" name="price" required/>
                </div>

                <div className="add-menu-input">
                    <label htmlFor="cal">Enter the new menu item calorie/caloric range:</label>
                    <input type="text" id="cal" name="cal" required/>
                </div>

                <div className="add-menu-buttons">
                    <button type="button" onClick={() => navigate(-1)}>Back</button>
                    <button type="submit" value="Submit">Add Item</button>
                </div>
            </form>
        </div>
    );
}
