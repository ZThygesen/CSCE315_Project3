import { useState } from "react";
import "./Option.css";

export default function OptionButton(props) {
    const id = props.data.product_id;
    const name = props.data.product_name;
    const type = props.data.product_type;
    const buttonType = props.buttonType;
    
    const [checked, setChecked] = useState(props.checked);

    function handleChange(e) {
        // if only 1 button can be selected for the given option type (e.x. proteins),
        // then toggle off the other currently selected option, given there is one
        if (buttonType === "radio") {
            const buttons = document.querySelectorAll(`input[name=${type}]`);
            Array.from(buttons)
                .filter(button => button.id !== id)
                .map(button => button.checked = false);
        }
        
        setChecked(e.target.checked);
    }

    return (
        <>
            <input
                type="checkbox"
                name={type}
                id={id}
                checked={checked}
                onChange={handleChange}
            />
            <label htmlFor={id} className="option">{name}</label>
        </>
    );
}
