import { useState } from "react";

export default function Extra(props) {
    const id = props.data.product_id;
    const name = props.data.product_name;

    const [checked, setChecked] = useState(props.checked);

    return (
        <>
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={e => setChecked(e.target.checked)}
            />
            <label htmlFor={id} className="extra">{name}</label>
        </>
    );
}
