import "./Modal.css";

/**
 * 
 * @param {*} props 
 * @returns modal
 */
export default function Modal(props) {
    return (
        <div className={`modal ${props.full ? "full" : ""} ${props.isVisible ? "" : "fade-out"}`}>
            {props.loading !== undefined ? <>{props.loading}</> :
                <div className={`modal-content ${props.isVisible ? "" : "hidden"}`}>
                    <div className="modal-header">
                        
                    </div>
                    <div className="modal-body">
                        {props.body}
                    </div>
                    <div className="modal-footer">
                        {props.footer}
                    </div>
                </div>
            }
        </div>
    );
}
