import "./LoadingSpinner.css";

/**
 * Displays loading spinner image before data is grabbed 
 * from the database or a query is successfully ran
 * 
 * @returns spinner
 */
export default function LoadingSpinner() {
    return (
        <div className="spinner-container">
            <div className="loading-spinner"></div>
        </div>
    );
}
