import { useState } from "react";

/**
 * Creates component to be used for extras button when creating an order
 * @param {*} props 
 *  
 */
export default function Extra(props) {
    const id = props.data.product_id;
    const name = props.data.product_name;
    const price = props.price;

    const [checked, setChecked] = useState(props.checked);

    return (
        <>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
            />
            <label htmlFor={id} className="extra">
                {name}
                {
                    price !== undefined ?
                        <> +${price.toFixed(2)}</> :
                        <></>
                }
            </label>
        </>
    );
}
