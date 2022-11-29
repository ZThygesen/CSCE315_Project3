import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem.js";
import Modal from "../../components/Modal.js";
import LoadingSpinner from "../../components/LoadingSpinner.js";

export default function EmployeeCreateOrder(props) {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const [emptySubmission, setEmptySubmission] = useState(false);
    const [submission, setSubmission] = useState(false);

    const [submissionMsg, setSubmissionMsg] = useState("");

    /**
     * Calculates price of items and fixes 
     * the value to 2 decimal values
     * @returns price
     */
    function calculatePrice() {
        let price = 0;

        props.orderItems.forEach(item => {
            price += item.price;
        });

        return price.toFixed(2);
    }

    /**
     * Handles submitting an order by passing information to the backend
     * @returns null
     */
    function submitOrder() {
        if (props.orderItems.length === 0) {
            setEmptySubmission(true);
            return;
        }

        setIsLoading(true);
        fetch("/api/submit-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: props.orderItems, price: calculatePrice() })
        })
            .then(res => res.json())
            .then(res => {
                setIsLoading(false);
                setSubmissionMsg(res);
                setSubmission(true);
            });
    }

    /**
     * Prevents user from submitting an empty order
     * @returns null
     */
    function EmptySubmissionModal() {
        return (
            <Modal isVisible={emptySubmission} full={true}
                body={
                    <p>Cannot submit empty order</p>
                }
                footer={ 
                    <button
                        className="modal-close-button"
                        onClick={() => setEmptySubmission(current => !current)}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    /**
     * Provides submission display message to prevent user
     * from spamming the submit button
     * 
     * @returns null
     */
    function SubmissionModal() {
        return (
            <Modal isVisible={submission} full={true}
                body={
                    <p>{submissionMsg}</p>
                }
                footer={
                    <button
                        className="modal-close-button"
                        onClick={() => {
                            setSubmission(current => !current);
                            setSubmissionMsg("");
                            props.clearOrder();
                        }}
                    >
                        Close
                    </button>
                }
            />
        );
    }

    return (
        <>
            <Modal isVisible={isLoading} full={true} loading={<LoadingSpinner />} />
            <EmptySubmissionModal />
            <SubmissionModal />
            <div className="create-order-container">
                <div className="left">
                    <p className="create-order-title">Current Order</p>
                    <div className="current-order-container">
                        <div className="current-order-labels">
                            <p className="order-item-label">Item</p>
                            <p>Price</p>
                        </div>
                        <div className="current-order-items-container">
                            {
                                props.orderItems.map((item, i) => (
                                    <OrderItem
                                        key={i}
                                        item={item}
                                        editOrderItem={props.editOrderItem}
                                        removeOrderItem={props.removeOrderItem}
                                    />
                                ))
                            }
                        </div>
                        <div className="current-order-price">
                            Total: ${calculatePrice()}
                        </div>
                    </div>
                    <div className="order-buttons-container">
                        <button onClick={() => navigate("/")}>Logout</button>
                        <button onClick={props.clearOrder}>Cancel</button>
                        <button onClick={submitOrder}>Submit</button>
                    </div>
                </div>
                <div className="right">
                    <p className="create-order-title">Add Items</p>
                    <div className="add-items-container">
                        <button onClick={() => props.changePage("Bowl")}>Bowl</button>
                        <button onClick={() => props.changePage("Gyro")}>Gyro</button>
                        <button onClick={() => props.changePage("Side")}>Sides</button>
                    </div>
                </div>
            </div>
        </>
    );
}
