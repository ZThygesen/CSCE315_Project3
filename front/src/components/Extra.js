export default function Extra(props) {
    const id = props.data.item_id;
    const name = props.data.item_name;

    return (
        <>
            <input type="checkbox" id={id} />
            <label htmlFor={id} className="extra">{name}</label>
        </>
    );
}
