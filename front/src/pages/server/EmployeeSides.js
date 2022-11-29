import { v4 as uuid } from "uuid";
import Option from "../../components/Option";

/**
 * Creates sides options for employee-side
 * of the interface
 * @param {*} props 
 * @returns null
 */
export default function EmployeeSides(props) {
    const sides = props.items;

    const editMode = props.editItem !== undefined

    /**
     * Gets item corresponding to given id
     * @param {*} selectionId 
     * @returns selection
     */
    function getSelectionObject(selectionId) {
        let selection;
        
        for (let i = 0; i < sides.length; i++) {
            if (sides[i].product_id === selectionId) {
                selection = sides[i];
                break;
            }
            
        }

        return selection
    }

    /**
     * Adds sides selected by employee to selection array.
     * Selection array displayed on order item screen
     * @param {*} e 
     */
    function handleSubmit(e) {
        e.preventDefault();

        const selections = Array.from(document.querySelectorAll(".order-options-form input[type=\"checkbox\"]"))
            .filter(option => option.checked)
            .map(selection => getSelectionObject(selection.id));
        
        if (selections.length === 0) {
            props.addSide();
        } else {
            selections.map(selection => (
                props.addSide({
                    id: uuid(),
                    type: "Side",
                    items: [selection],
                    price: selection.price
                })
            ))
        }
    }

    return (
        <>
            <div className="side-options-container">
                <div className="side-options-title">
                    <h1>Side Selections</h1>
                </div>
                <form onSubmit={handleSubmit} className="order-options-form">
                    <div className="side-options">
                        {
                            sides.map((item, i) =>
                                <Option
                                    key={i}
                                    data={item}
                                    buttonType="checkbox"
                                    checked={editMode ? props.editItem.items.includes(item) : false}
                                />
                            )
                        }
                    </div>
                    <div className="side-option-buttons">
                        <button type="button" className="order-option-button" onClick={() => props.addSide()}>Cancel</button>
                        <button type="submit" className="order-option-button">Add to Order</button>
                    </div>
                </form>
            </div>
        </>
    );
}
