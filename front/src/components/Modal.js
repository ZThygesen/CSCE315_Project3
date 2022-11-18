import "./Modal.css";

export default function Modal(props) {
    return (
        <div className={`modal ${props.full ? "full" : ""} ${props.isVisible ? "" : "fade-out"}`}>
            <div className="modal-content">
                <div className="modal-header">
                    
                </div>
                <div className="modal-body">
                    {props.body}
                </div>
                <div className="modal-footer">

                </div>
            </div>
        </div>
    );
}
