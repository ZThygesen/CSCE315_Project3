export default function Extra(props) {
    const id = props.data.product_id;
    const name = props.data.product_name;

    return (
        <>
            <input type="checkbox" id={id} />
            <label htmlFor={id} className="extra">{name}</label>
        </>
    );
}
