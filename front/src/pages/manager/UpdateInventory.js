import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * @description This allows the manager the ability to update the information of an item in the inventory
 * @author Zach, Ardian
 * @returns Update Inventory Page
 */
export default function UpdateInventory() {
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
     * @description This will get the the item selected and the new information from the user and sends it to the server when the
     * user presses the submit button. It then gets the confirmation from the server to display to the user
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        var selection = document.getElementById("item");
        const id = selection.options[selection.selectedIndex].value;

        const quantity = document.getElementById("quan").value;
        const type = document.getElementById("type").value;
        const serve = document.getElementById("serve").value;
        const minimum = document.getElementById("min").value;

        setIsLoading(true);
        fetch("/api/update-inv", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, quantity: quantity, type: type, serve: serve, onhand: minimum })
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
        <div className="update-inventory-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <SubmissionModal />
            {initialLoading ? <></> :
                <>
                    <h1>Update Inventory</h1>

                    {/* Where the user enters the information */}
                    <form className="update-inventory-form" onSubmit={handleSubmit}>
                        
                        {/* Lists the items currently in the inventory */}
                        <div className="update-inventory-input">
                            <label htmlFor="item">
                                Choose an item to update:
                            </label>
                            <select id="item">
                                {
                                    inventory.map((item,i) =>
                                        <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="update-inventory-input">
                            <label htmlFor="quan">Enter the quantity:</label>
                            <input type="text" id="quan" name="quan" />
                        </div>

                        <div className="update-inventory-input">
                            <label htmlFor="type">Enter the product type:</label>
                            <input type="text" id="type" name="type" />
                        </div>

                        <div className="update-inventory-input">
                            <label htmlFor="serve">Enter the serving size:</label>
                            <input type="text" id="serve" name="serve" />
                        </div>

                        <div className="update-inventory-input">
                            <label htmlFor="min">Enter the minimum required amount:</label>
                            <input type="text" id="min" name="min" />
                        </div>

                        <div className="update-inventory-buttons">
                            <button type="button" onClick={() => navigate(-1)}>Back</button>
                            <button type="submit" value="Submit">Update Item</button>
                        </div>
                    </form>
                </>
            }
        </div>
    );
}
