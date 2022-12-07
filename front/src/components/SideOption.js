import { useState } from "react";
import "./Option.css";

/**
 * Creates options button to be used on create order screen
 * @param {*} props 
 * @returns option button
 */
export default function SideOption(props) {
    const id = props.data.product_id;
    const name = props.data.product_name;
    const type = props.data.product_type;
    const buttonType = props.buttonType;
    const price = props.price;
    
    const [checked, setChecked] = useState(props.checked);

    const [counter, setCounter] = useState(0);

    function increase() {
        props.setQuantity(props.data, counter + 1) ;
        setCounter(count => count + 1);
    }

    function decrease() {
        if (counter > 0) {
            props.setQuantity(props.data, counter - 1);
            setCounter(count => count - 1);
        }
    }

    function handleChange(e) {
        if (checked) {
            props.setQuantity(props.data, 0);
            setCounter(0);
        } else {
            props.setQuantity(props.data, 1);
            setCounter(1);
        }

        setChecked(e.target.checked);
    }

    return (
        <div className="side-option">
            <div className="side-input">
                <input
                    type="checkbox"
                    name={type}
                    id={id}
                    checked={checked}
                    onChange={handleChange}
                />
                <label htmlFor={id} className={`option ${buttonType === "checkbox" ? "square" : ""}`}>
                    {name}
                    {
                        price !== undefined ?
                            <> +${price.toFixed(2)}</> :
                            <></>
                    }
                </label>
            </div>
            <div className="counter">
                {checked ? (
                    <>
                        <button type="button" onClick={decrease} className="counter-button">-</button>
                        <p>{counter}</p>
                        <button type="button" onClick={increase} className="counter-button">+</button>
                    </>
                ) : <div style={{height: "98px"}}></div>
                }
                
            </div>
        </div>
    );
}
