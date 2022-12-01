import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * @description This allows the manager the ability to remove an item from the inventory
 * @author Zach, Ardian
 * @returns Remove Inventory Page
 */
export default function RemoveInventory() {
    const navigate = useNavigate();

    const [initialLoading, setInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    
    const [submission, setSubmission] = useState(false);
    const [submissionMsg, setSubmissionMsg] = useState("");

    const [inventory, setInventory] = useState([{}]);

    useEffect(() => {
        setInitialLoading(true);
        setIsLoading(true);
        fetch("/api/inventory")
            .then(res => res.json())
            .then(inventory => {
                setTimeout(() => {
                    setInventory(inventory.inventory);
                    setInitialLoading(false);
                    setIsLoading(false);
                }, 250);
            });
    }, []);

    /**
     * @description This gets the item the user selected and sends it to the server when the user presses submit. 
     * It then gets the confirmation from the server to display to the user
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        var selection = document.getElementById("item");
        const id = selection.options[selection.selectedIndex].value;

        setIsLoading(true);
        fetch("/api/remove-inv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id })
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
        <div className="remove-inventory-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <SubmissionModal />
            {initialLoading ? <></> :
                <>
                    <h1>Remove Inventory</h1>

                    {/* Where the user enters the information */}
                    <form className="remove-inventory-form" onSubmit={handleSubmit}>
                        
                        {/* Lists the items currently in the inventory */}
                        <div className="remove-inventory-input">
                            <label htmlFor="item">
                                Choose an item to remove:
                            </label>
                            <select id="item">
                                {
                                    inventory.map((item,i) =>
                                        <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <div className="remove-inventory-buttons">
                            <button type="button" onClick={() => navigate(-1)}>Back</button>
                            <button type="submit" value="Submit">Remove Item</button>
                        </div>
                    </form>
                </>
            }
        </div>
    );
}
