import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

/**
 * This allows the manager the ability to update an item in the menu
 * @author Zach, Ardian
 * @returns Update Menu Page
 */
export default function UpdateMenu() {
    const navigate = useNavigate();

    const [initialLoading, setInitialLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    const [submission, setSubmission] = useState(false);
    const [submissionMsg, setSubmissionMsg] = useState("");

    const [menu, setMenu] = useState([{}]);

    useEffect(() => {
        setInitialLoading(true);
        setIsLoading(true);
        fetch("/api/menu")
            .then(res => res.json())
            .then(menu => {
                setTimeout(() => {
                    setMenu(menu.menu);
                    setInitialLoading(false);
                    setIsLoading(false);
                }, 250);
            });
    }, []);


    /**
     * This will get the the item selected and the new information from the user and sends it to the server when the
     * user presses the submit button. It then gets the confirmation from the server to display to the user
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();
        
        var selection = document.getElementById("item");
        const id = selection.options[selection.selectedIndex].value;

        const price = document.getElementById("price").value;
        const type = document.getElementById("type").value;
        const calories = document.getElementById("cal").value;

        setIsLoading(true);
        fetch("/api/update-menu", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: id, price: price, type: type, cal: calories })
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
        <div className="update-menu-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <SubmissionModal />
            {initialLoading ? <></> :
                <>
                    <h1>Update Inventory</h1>
                    {/* Where the user enters the information */}
                    <form className="update-menu-form" onSubmit={handleSubmit}>
                        
                        {/* Lists the items currently in the inventory */}
                        <div className="update-menu-input">
                            <label htmlFor="item">
                                Choose an item to update:
                            </label>
                            <select id="item">
                                {
                                    menu.map((item,i) =>
                                        <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                                    )
                                }
                            </select>
                        </div>

                        <div className="update-menu-input">
                            <label htmlFor="price">Enter the price:</label>
                            <input type="text" id="price" name="price" />
                        </div>

                        <div className="update-menu-input">
                            <label htmlFor="cal">Enter the calories:</label>
                            <input type="text" id="cal" name="cal" />
                        </div>

                        <div className="update-menu-input">
                            <label htmlFor="type">Enter the product type:</label>
                            <input type="text" id="type" name="type" />
                        </div>

                        <div className="update-menu-buttons">
                            <button type="button" onClick={() => navigate(-1)}>Back</button>
                            <button type="submit" value="Submit">Update Item</button>
                        </div>
                    </form>
                </>
            }
        </div>
    );
}
