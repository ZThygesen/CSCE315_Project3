import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Modal from "../../components/Modal";
import LoadingSpinner from "../../components/LoadingSpinner";

export default function RemoveMenu() {
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

    //What happens when the user clicks submit
    function handleSubmit(e) {
        e.preventDefault();
        
        var selection = document.getElementById("item");
        const id = selection.options[selection.selectedIndex].value;

        setIsLoading(true);
        fetch("/api/remove-menu", {
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
        <div className="remove-menu-container">
            <Modal isVisible={isLoading} loading={<LoadingSpinner />} />
            <SubmissionModal />
            {initialLoading ? <></> :
                <>
                    <h1>Remove Menu</h1>
                    {/* Where the user enters the information */}
                    <form className="remove-menu-form" onSubmit={handleSubmit}>
                        
                        {/* Lists the items currently in the menu */}
                        <div className="remove-menu-input">
                            <label htmlFor="item">
                                Choose an item to remove:
                            </label>
                            <select id="item">
                                {
                                    menu.map((item,i) =>
                                        <option key={i} value={item.product_id} name={item.product_name}>{item.product_name}</option>
                                    )
                                }
                            </select>
                        </div>
                        <p></p>

                        <div className="remove-menu-buttons">
                            <button type="button" onClick={() => navigate(-1)}>Back</button>
                            <button type="submit" value="Submit">Remove Item</button>
                        </div>
                    </form>
                </>
            }
        </div>
    );
}
